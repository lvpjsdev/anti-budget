# Task 003: Telegram Web App SDK Setup

**Epic:** epic-001-project-scaffold  
**Status:** 🔲 TODO  
**Estimated Effort:** 2 hours  
**Type:** Code — SDK integration

---

## Goal

Wire `@twa-dev/sdk` into the React app so every component can access the Telegram Web App API, apply Telegram's color scheme (dark/light) automatically, and degrade gracefully when running outside Telegram (local dev, browser).

---

## Acceptance Criteria

- [ ] `WebApp.ready()` is called on app mount (exactly once)
- [ ] `WebApp.expand()` is called on app mount (full-screen mode)
- [ ] `useTelegram()` hook returns `{ webApp, user, colorScheme, isInTelegram }`
- [ ] When `isInTelegram` is false (browser dev), app renders with fallback colors (no crash)
- [ ] When `isInTelegram` is true, `document.documentElement` has `data-theme="dark"` or `data-theme="light"` applied
- [ ] Telegram user's first name is accessible via `user?.first_name`
- [ ] `WebApp.enableClosingConfirmation()` is called (prevents accidental close mid-entry)
- [ ] No TypeScript errors
- [ ] App tested inside real Telegram Mini App via BotFather Menu Button (or Telegram bot link)

---

## Estimated Effort

**2 hours**
- 30 min: useTelegram hook implementation
- 30 min: Theme application + dark mode CSS
- 30 min: Telegram bot setup via @BotFather + dev URL config
- 30 min: Testing in actual Telegram

---

## Dependencies

- [task-001-vite-react-setup.md](./task-001-vite-react-setup.md) — project must exist with `@twa-dev/sdk` installed

---

## Notes / Implementation Hints

### useTelegram Hook

```typescript
// src/hooks/useTelegram.ts
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface UseTelegramReturn {
  webApp: typeof WebApp;
  user: TelegramUser | undefined;
  colorScheme: 'light' | 'dark';
  isInTelegram: boolean;
}

export function useTelegram(): UseTelegramReturn {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    WebApp.colorScheme ?? 'light'
  );

  const isInTelegram = Boolean(WebApp.initData);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.enableClosingConfirmation();

    // Apply theme to document root for CSS variables
    document.documentElement.setAttribute('data-theme', WebApp.colorScheme);

    // Listen for theme changes (user switches Telegram theme mid-session)
    const handleThemeChange = () => {
      setColorScheme(WebApp.colorScheme);
      document.documentElement.setAttribute('data-theme', WebApp.colorScheme);
    };
    WebApp.onEvent('themeChanged', handleThemeChange);

    return () => {
      WebApp.offEvent('themeChanged', handleThemeChange);
    };
  }, []);

  return {
    webApp: WebApp,
    user: WebApp.initDataUnsafe?.user as TelegramUser | undefined,
    colorScheme,
    isInTelegram,
  };
}
```

### Dark Mode CSS Variables

```css
/* src/index.css — add after the :root block */

[data-theme="dark"] {
  --tg-bg: var(--tg-theme-bg-color, #212121);
  --tg-text: var(--tg-theme-text-color, #ffffff);
  --tg-hint: var(--tg-theme-hint-color, #aaaaaa);
  --tg-button: var(--tg-theme-button-color, #2481cc);
  --tg-button-text: var(--tg-theme-button-text-color, #ffffff);
  --tg-secondary-bg: var(--tg-theme-secondary-bg-color, #181818);
  --tg-link: var(--tg-theme-link-color, #6ab3f3);
  --tg-destructive: var(--tg-theme-destructive-text-color, #ff453a);
}
```

> Note: The `--tg-theme-*` CSS variables are injected by the Telegram WebApp script and always override these fallbacks when inside Telegram. The fallback values are only used during local development.

### App.tsx — Call Hook at Root

```typescript
// src/App.tsx
import { useTelegram } from './hooks/useTelegram';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  const { isInTelegram, user } = useTelegram();

  return (
    <>
      {!isInTelegram && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-xs text-center py-1 z-50">
          Dev mode — running outside Telegram
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}
```

### BotFather Setup (Manual — ~15 min)

1. Open Telegram → search `@BotFather`
2. Send `/newbot` → follow prompts → get bot token
3. Send `/newapp` or use `/setmenubutton`:
   - Select your bot
   - Set Menu Button URL: `https://lvpjsdev.github.io/anti-budget/`
   - Title: "Anti-Budget"
4. For development, use `ngrok` or Vite's `--host` + local tunnel:
   ```bash
   # Option A: ngrok
   npx ngrok http 5173
   # Use the HTTPS URL from ngrok as your Mini App URL during dev
   
   # Option B: vite --host
   npm run dev -- --host
   # Use your local IP: http://192.168.x.x:5173
   # Only works if phone is on same WiFi
   ```

### Debugging in Telegram

```typescript
// Add to useTelegram hook for debugging (remove before production)
if (import.meta.env.DEV) {
  console.log('[TG] Platform:', WebApp.platform);
  console.log('[TG] Version:', WebApp.version);
  console.log('[TG] Color scheme:', WebApp.colorScheme);
  console.log('[TG] User:', WebApp.initDataUnsafe?.user);
  console.log('[TG] Viewport:', WebApp.viewportHeight, 'stable:', WebApp.viewportStableHeight);
}
```

To see console logs inside Telegram Mini App on mobile:
- Android: Use Chrome DevTools remote debugging via USB
- iOS: Use Safari → Develop → [your device] → [WebView]

### Common Gotchas

1. **`WebApp.initData` is empty in browser** — this is expected. `isInTelegram` will be `false`. Handle both cases.
2. **`WebApp.expand()` has no effect in browser** — also expected. Only applies inside TMA.
3. **Theme variables not applied** — ensure `<script src="https://telegram.org/js/telegram-web-app.js">` is in `index.html` BEFORE your app script.
4. **`@twa-dev/sdk` types** — the package includes its own types. No `@types/` needed.
