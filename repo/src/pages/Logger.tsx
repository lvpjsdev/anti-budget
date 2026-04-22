import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { addTransaction } from '../db'
import type { Transaction } from '../db/schema'

export default function Logger() {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleSave = async () => {
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      WebApp.HapticFeedback.notificationOccurred('error')
      return
    }

    setSaving(true)
    WebApp.HapticFeedback.impactOccurred('medium')

    const categoryId = localStorage.getItem('selectedCategory') || 'coffee'
    const now = Date.now()

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      categoryId,
      amount: amountNum,
      note: note.trim() || undefined,
      timestamp: now,
      createdAt: now,
    }

    await addTransaction(transaction)

    setAmount('')
    setNote('')
    setSaving(false)

    WebApp.HapticFeedback.notificationOccurred('success')
    WebApp.showAlert('added!')
    navigate('/stats')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Amount</label>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-2xl font-medium focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Note <span className="text-neutral-600">(optional)</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you buy?"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-base focus:outline-none focus:border-neutral-600"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !amount}
        className="w-full bg-white text-neutral-950 font-semibold py-4 rounded-xl text-lg active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}