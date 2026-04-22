import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'

const CATEGORIES = [
  { id: 'coffee', emoji: '☕', label: 'Coffee' },
  { id: 'delivery', emoji: '🧋', label: 'Delivery' },
  { id: 'taxi', emoji: '🚕', label: 'Taxi' },
  { id: 'vapes', emoji: '💨', label: 'Vapes' },
  { id: 'alcohol', emoji: '🍺', label: 'Alcohol' },
] as const

type CategoryId = typeof CATEGORIES[number]['id']

export default function Onboarding() {
  const [selected, setSelected] = useState<CategoryId | null>(null)
  const navigate = useNavigate()

  const handleSelect = (id: CategoryId) => {
    setSelected(id)
    WebApp.HapticFeedback.impactOccurred('medium')
    setTimeout(() => {
      localStorage.setItem('selectedCategory', id)
      WebApp.BackButton.show()
      navigate('/logger')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-2">anti-budget</h1>
      <p className="text-neutral-400 text-center text-sm mb-8">
        Select your vice category
      </p>

      <div className="flex-1 grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-200 border ${
              selected === cat.id
                ? 'bg-white text-neutral-950 border-white scale-95'
                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 active:scale-95'
            }`}
          >
            <span className="text-4xl mb-2">{cat.emoji}</span>
            <span className="text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}