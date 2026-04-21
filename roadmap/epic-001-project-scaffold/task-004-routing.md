# Task 004: Client-Side Routing & Navigation Shell

**Epic:** epic-001-project-scaffold  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Code — Navigation & layout

---

## Goal

Implement client-side routing with React Router v6, create a bottom tab navigation bar that feels native on mobile, and set up placeholder screens so the app shell is complete and navigable before individual screens are built.

---

## Acceptance Criteria

- [ ] React Router v6 configured with `createBrowserRouter` and correct `basename` for GitHub Pages
- [ ] Bottom tab bar renders with 3 tabs: Log (primary), Stats, History
- [ ] Active tab is visually highlighted with Telegram theme colors
- [ ] Navigating between tabs does NOT trigger a full page reload
- [ ] Tab bar is fixed at bottom, content scrolls above it
- [ ] Safe area inset handled (bottom notch on iPhone, Android nav bar)
- [ ] Each tab shows a distinct placeholder screen with the tab name
- [ ] Back navigation works correctly within screens that have sub-pages
- [ ] App loads correctly at `lvpjsdev.github.io/anti-budget/` (not just at root `/`)
- [ ] No TypeScript errors

---

## Estimated Effort

**3 hours**
- 45 min: Router setup + basename config
- 1h: TabBar component
- 45 min: Layout shell
- 30 min: Placeholder screens
- Verify navigation in browser

---

## Dependencies

- [task-001-vite-react-setup.md](./task-001-vite-react-setup.md) — project setup
- [task-003-twa-sdk-setup.md](./task-003-twa-sdk-setup.md) — useTelegram hook (for Back button)

---

## Notes / Implementation Hints

### Router Configuration

```typescript
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LogScreen } from './screens/LogScreen';
import { StatsScreen } from './screens/StatsScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <LogScreen /> },
        { path: 'stats', element: <StatsScreen /> },
        { path: 'history', element: <HistoryScreen /> },
      ],
    },
    {
      // Onboarding is outside the tab layout — full screen
      path: '/onboarding',
      element: <OnboardingScreen />,
    },
  ],
  {
    basename: '/anti-budget', // Matches GitHub Pages repo path
  }
);
```

> **Why `basename`?** GitHub Pages serves at `/anti-budget/`, not `/`. Without basename, React Router won't match routes correctly after deployment.

### Layout Component (App Shell)

```typescript
// src/components/Layout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from './TabBar';
import { useCategory } from '../hooks/useDb';
import { useEffect } from 'react';

export function Layout() {
  const { category, loading } = useCategory();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to onboarding if no category set
  useEffect(() => {
    if (!loading && !category) {
      navigate('/onboarding', { replace: true });
    }
  }, [loading, category, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-tg-bg">
        <div className="text-tg-hint text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-tg-bg">
      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>

      {/* Fixed bottom tab bar */}
      <TabBar />
    </div>
  );
}
```

### TabBar Component

```typescript
// src/components/TabBar.tsx
import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', label: 'Log', emoji: '➕', exact: true },
  { to: '/stats', label: 'Stats', emoji: '📊' },
  { to: '/history', label: 'History', emoji: '📋' },
] as const;

export function TabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-tg-secondary-bg border-t border-tg-hint/20"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)', // iPhone notch
      }}
    >
      <div className="flex">
        {TABS.map(({ to, label, emoji, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              [
                'flex-1 flex flex-col items-center py-2 text-xs transition-colors',
                isActive
                  ? 'text-tg-button font-semibold'
                  : 'text-tg-hint',
              ].join(' ')
            }
          >
            <span className="text-xl mb-0.5">{emoji}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
```

### Placeholder Screens (Temporary — replaced by epic-002)

```typescript
// src/screens/LogScreen.tsx (placeholder)
export function LogScreen() {
  return (
    <div className="p-6">
      <h1 className="text-tg-text text-2xl font-bold">Log</h1>
      <p className="text-tg-hint mt-2">Quick expense logger — coming soon</p>
    </div>
  );
}
```

Repeat for `StatsScreen.tsx` and `HistoryScreen.tsx` and `OnboardingScreen.tsx`.

### Handling the GitHub Pages 404 Problem

React Router with `createBrowserRouter` will break on direct URL access (e.g., navigating to `lvpjsdev.github.io/anti-budget/stats` directly) because GitHub Pages returns a 404 for non-root paths.

**Fix:** Add a `404.html` that redirects back to the app:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
<head>
  <script>
    // Redirect 404s back to index.html with the path encoded
    const path = window.location.pathname.replace('/anti-budget', '') || '/';
    window.location.replace('/anti-budget/?redirect=' + encodeURIComponent(path));
  </script>
</head>
</html>
```

And in `index.html`, handle the redirect:
```html
<script>
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  if (redirect) {
    history.replaceState(null, '', '/anti-budget' + redirect);
  }
</script>
```

> **Alternative (simpler):** Use `createHashRouter` instead of `createBrowserRouter`. This uses URL hashes (`/#/stats`) instead of real paths. No 404 issue. Slightly uglier URLs but works perfectly for GitHub Pages.

### Telegram BackButton Integration

When a screen has sub-navigation (e.g., Settings opened from Stats), use Telegram's native Back button:

```typescript
// src/hooks/useTelegramBackButton.ts
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';

export function useTelegramBackButton(show: boolean) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) {
      WebApp.BackButton.hide();
      return;
    }

    WebApp.BackButton.show();
    const handleClick = () => navigate(-1);
    WebApp.BackButton.onClick(handleClick);

    return () => {
      WebApp.BackButton.offClick(handleClick);
      WebApp.BackButton.hide();
    };
  }, [show, navigate]);
}
```

Usage in a settings screen:
```typescript
useTelegramBackButton(true); // shows Telegram's native back arrow
```
