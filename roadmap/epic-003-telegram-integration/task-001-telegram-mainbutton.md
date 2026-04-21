# Task 001: Telegram MainButton Integration

**Epic:** epic-003-telegram-integration  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Code — TMA SDK integration

---

## Goal

Wire Telegram's native MainButton (the large button at the bottom of the Mini App window) to replace the custom "Add" button on the Logger screen and serve as the primary CTA throughout the app — making the app feel completely native to Telegram.

---

## Acceptance Criteria

- [ ] On the Logger screen: MainButton shows "Add $X.XX" when amount > 0
- [ ] When amount is 0 or empty, MainButton is hidden (not just disabled)
- [ ] Tapping MainButton submits the expense (same behavior as the existing "Add" button)
- [ ] MainButton shows loading state (spinner) while the DB write is in progress
- [ ] After successful save: MainButton is hidden, success feedback shown
- [ ] On the Stats screen: MainButton is hidden (no action needed there)
- [ ] On the History screen: MainButton is hidden
- [ ] On Onboarding screen: MainButton shows "Start tracking →" when category selected
- [ ] MainButton state is cleaned up on component unmount (no lingering state across screens)
- [ ] In browser (non-TMA): app works normally using the in-screen button (graceful degradation)
- [ ] No TypeScript errors

---

## Estimated Effort

**3 hours**
- 1h: useMainButton hook
- 1h: Logger screen integration
- 30 min: Onboarding screen integration
- 30 min: Hide MainButton on Stats + History

---

## Dependencies

- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — WebApp available
- [epic-002/task-002](../epic-002-core-screens/task-002-logger-screen.md) — Logger screen built

---

## Notes / Implementation Hints

### useMainButton Hook

```typescript
// src/hooks/useMainButton.ts
import { useEffect, useRef } from 'react';
import WebApp from '@twa-dev/sdk';

interface MainButtonOptions {
  text: string;
  visible: boolean;
  loading?: boolean;
  onClick: () => void;
}

export function useMainButton({ text, visible, loading = false, onClick }: MainButtonOptions) {
  const callbackRef = useRef(onClick);
  callbackRef.current = onClick; // Always up to date without re-subscribing

  useEffect(() => {
    const handler = () => callbackRef.current();

    if (visible && !loading) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.show();
      WebApp.MainButton.hideProgress();
      WebApp.MainButton.onClick(handler);
    } else if (visible && loading) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.show();
      WebApp.MainButton.showProgress(false); // false = don't disable button
    } else {
      WebApp.MainButton.hide();
    }

    return () => {
      WebApp.MainButton.offClick(handler);
    };
  }, [text, visible, loading]);

  // Hide on unmount
  useEffect(() => {
    return () => {
      WebApp.MainButton.hide();
      WebApp.MainButton.hideProgress();
    };
  }, []);
}
```

### Logger Screen Update

```typescript
// In LogScreen.tsx — add after existing state declarations

const [saving, setSaving] = useState(false);

useMainButton({
  text: value > 0 ? `Add $${display}` : 'Enter amount',
  visible: value > 0,
  loading: saving,
  onClick: handleAdd, // existing submit handler
});

// Update handleAdd to set saving state:
async function handleAdd() {
  if (value <= 0 || !category || saving) return;
  setSaving(true);
  try {
    // ... existing save logic ...
  } finally {
    setSaving(false);
  }
}
```

### Onboarding Screen Update

```typescript
// In OnboardingScreen.tsx

useMainButton({
  text: 'Start tracking →',
  visible: canProceed,
  loading: saving,
  onClick: handleStart,
});
```

### Clearing MainButton on Screen Without Action

```typescript
// In StatsScreen.tsx and HistoryScreen.tsx — add this:
useEffect(() => {
  WebApp.MainButton.hide();
  return () => WebApp.MainButton.hide();
}, []);
```

Or create a `useHideMainButton()` convenience hook:

```typescript
// src/hooks/useHideMainButton.ts
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export function useHideMainButton() {
  useEffect(() => {
    WebApp.MainButton.hide();
    return () => WebApp.MainButton.hide();
  }, []);
}
```

### MainButton Color Customization

Telegram's MainButton uses the theme's button color by default. To customize:
```typescript
WebApp.MainButton.setParams({
  color: '#2481cc',      // button background
  text_color: '#ffffff', // button text
});
```

Usually you want to keep the default theme colors — it looks native.

### Degradation Outside Telegram

`@twa-dev/sdk`'s MainButton methods are no-ops when `window.Telegram?.WebApp` is not available (browser context). So all the `WebApp.MainButton.*` calls will silently do nothing in the browser — the in-screen button still works.

No need for explicit `isInTelegram` guards for MainButton calls.

### Visual Result

In Telegram Mini App, the UI should look like:
- Large amount display in the center
- Number pad below
- Telegram's native blue MainButton at the very bottom: `"Add $5.50"`

The in-app custom button can be **hidden in TMA context** once MainButton is working:
```typescript
// Hide custom button when inside Telegram (MainButton replaces it)
{!isInTelegram && (
  <button onClick={handleAdd} ...>
    Add {value > 0 ? `$${display}` : ''}
  </button>
)}
```
