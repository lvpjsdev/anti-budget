import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/logger', label: 'Logger', icon: 'plus' },
  { path: '/stats', label: 'Stats', icon: 'chart' },
  { path: '/history', label: 'History', icon: 'list' },
]

function Icon({ name }: { name: string }) {
  if (name === 'plus') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 5v14M5 12h14" />
      </svg>
    )
  }
  if (name === 'chart') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    )
  }
  if (name === 'list') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    )
  }
  return null
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--tg-bg)] border-t border-[var(--tg-delimiter)] px-4 py-2 pb-safe">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-[var(--tg-button)]'
                  : 'text-[var(--tg-hint)] hover:text-[var(--tg-text)]'
              }`
            }
          >
            <Icon name={item.icon} />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}