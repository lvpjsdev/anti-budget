import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { getTransactionsByMonth, getCategory } from '../db'
import { useSettings } from '../hooks/useDb'
import type { Transaction, Category } from '../db/schema'
import { formatCurrency } from '../utils/currency'

interface ComparisonItem {
  label: string
  cost: number
}

const COMPARISONS: Record<string, ComparisonItem[]> = {
  coffee: [
    { label: 'flight to Tokyo', cost: 1200 },
    { label: 'iPhone', cost: 1000 },
    { label: 'month of gym membership', cost: 80 },
    { label: 'fancy dinner for two', cost: 200 },
    { label: 'espresso machine', cost: 400 },
  ],
  delivery: [
    { label: 'gaming console', cost: 500 },
    { label: 'movie theater rental', cost: 300 },
    { label: 'week of groceries', cost: 150 },
    { label: 'fitness tracker', cost: 200 },
    { label: 'night at a hotel', cost: 250 },
  ],
  taxi: [
    { label: 'round-trip flight to another city', cost: 400 },
    { label: 'laptop', cost: 1200 },
    { label: 'month of car insurance', cost: 150 },
    { label: 'smartphone', cost: 800 },
    { label: 'concert tickets', cost: 300 },
  ],
  vapes: [
    { label: 'premium vape device', cost: 200 },
    { label: 'mountain bike', cost: 800 },
    { label: 'quality headphones', cost: 300 },
    { label: 'weekend getaway', cost: 600 },
    { label: 'gaming PC component', cost: 500 },
  ],
  alcohol: [
    { label: 'quality liquor cabinet', cost: 400 },
    { label: 'fine dining experience', cost: 350 },
    { label: 'weekend trip', cost: 800 },
    { label: 'preium champagne bottle', cost: 150 },
    { label: 'year of streaming subscriptions', cost: 600 },
  ],
}

function getComparison(total: number, categoryId: string): ComparisonItem | null {
  const items = COMPARISONS[categoryId]
  if (!items) return null

  const match = items.find((item) => total >= item.cost)
  return match || null
}

export default function ShameStats() {
  const { settings } = useSettings()
  const [monthTotal, setMonthTotal] = useState(0)
  const [annualized, setAnnualized] = useState(0)
  const [category, setCategory] = useState<Category | null>(null)
  const [comparison, setComparison] = useState<ComparisonItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()

      const [transactions, currentCategory] = await Promise.all([
        getTransactionsByMonth(year, month),
        getCategory(),
      ])

      const total = transactions.reduce((sum: number, tx: Transaction) => sum + tx.amount, 0)
      const categoryId = currentCategory?.id || localStorage.getItem('selectedCategory') || 'coffee'

      setMonthTotal(total)
      setAnnualized(total * 12)
      setCategory(currentCategory || null)
      setComparison(getComparison(total, categoryId))
      setLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    if (WebApp?.HapticFeedback) {
      WebApp.HapticFeedback.selectionChanged()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen tg-bg flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen tg-bg text-tg-text px-6 py-8 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shame Stats</h1>
        <p className="text-tg-hint text-sm">
          Your {category?.name || 'vice'} spending this month
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="text-center">
          <div className="text-6xl font-bold">
            {formatCurrency(monthTotal, settings?.currency)}
          </div>
          <div className="text-tg-hint mt-2 text-sm uppercase tracking-wide">
            This Month
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-px bg-tg-delimiter flex-1" />
          <span className="px-4 text-tg-hint text-sm">×12</span>
          <div className="h-px bg-tg-delimiter flex-1" />
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold text-tg-button">
            {formatCurrency(annualized, settings?.currency)}
          </div>
          <div className="text-tg-hint mt-2 text-sm uppercase tracking-wide">
            Annual Projection
          </div>
        </div>

        {comparison && (
          <div className="bg-tg-secondary/10 rounded-2xl p-6 border border-tg-delimiter mt-8">
            <p className="text-tg-hint text-sm text-center mb-2">
              This equals
            </p>
            <p className="text-xl font-semibold text-center">
              {Math.floor(monthTotal / comparison.cost)}× {comparison.label}
            </p>
            <p className="text-tg-hint text-xs text-center mt-2">
              ~{formatCurrency(comparison.cost, settings?.currency)} each
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-tg-delimiter">
        <p className="text-tg-hint text-xs text-center">
          Based on your {category?.name || 'selected'} category
        </p>
      </div>
    </div>
  )
}
