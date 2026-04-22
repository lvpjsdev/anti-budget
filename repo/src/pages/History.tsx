import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { getTransactionsByMonth, deleteTransaction } from '../db'
import type { Transaction } from '../db/schema'
import { formatCurrency } from '../utils/currency'
import { format } from 'date-fns'

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    const load = async () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const txs = await getTransactionsByMonth(year, month)
      txs.sort((a, b) => b.timestamp - a.timestamp)
      if (mounted) {
        setTransactions(txs)
        setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const handleDelete = async (id: string) => {
    WebApp.HapticFeedback.impactOccurred('medium')
    await deleteTransaction(id)
    setTransactions(transactions.filter((tx) => tx.id !== id))
    WebApp.HapticFeedback.notificationOccurred('success')
  }

  const getCategoryEmoji = (categoryId: string) => {
    const emojiMap: Record<string, string> = {
      coffee: '☕',
      delivery: '🛵',
      taxi: '🚗',
      vapes: '💨',
      alcohol: '🍷',
    }
    return emojiMap[categoryId] || '💰'
  }

  if (loading) {
    return (
      <div className="min-h-screen tg-bg flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen tg-bg pb-6">
      <div className="sticky top-0 bg-tg-bg/80 backdrop-blur-lg border-b border-tg-delimiter px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-tg-button text-lg font-medium active:opacity-70"
          >
            Back
          </button>
          <h1 className="text-lg font-semibold">History</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-6 py-4">
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-tg-hint text-lg">No transactions this month</p>
            <button
              onClick={() => navigate('/logger')}
              className="mt-4 text-tg-button font-medium"
            >
              Add one
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-tg-secondary/10 rounded-2xl p-4 border border-tg-delimiter"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0 pt-0.5">
                    {getCategoryEmoji(tx.categoryId)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold truncate">
                        {formatCurrency(tx.amount)}
                      </p>
                      <p className="text-tg-hint text-sm flex-shrink-0">
                        {format(new Date(tx.timestamp), 'MMM d')}
                      </p>
                    </div>
                    {tx.note && (
                      <p className="text-tg-hint text-sm mt-1 truncate">
                        {tx.note}
                      </p>
                    )}
                    <p className="text-tg-hint text-xs mt-2">
                      {format(new Date(tx.timestamp), 'h:mm a')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-tg-hint p-2 active:text-red-500 flex-shrink-0"
                    aria-label="Delete transaction"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
