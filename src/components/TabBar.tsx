import { NavLink } from 'react-router-dom';

const tabs = [
  { path: '/logger', icon: '➕', label: 'Log' },
  { path: '/stats', icon: '📊', label: 'Stats' },
  { path: '/history', icon: '🕐', label: 'History' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-tg-secondary border-t border-tg-hint z-10">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-tg-button' : 'text-tg-hint'
              }`
            }
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs mt-0.5">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
