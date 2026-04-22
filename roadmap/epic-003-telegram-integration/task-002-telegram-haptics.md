# Task 002: Telegram Haptic Feedback

**Epic:** epic-003-telegram-integration  
**Status:** 🔲 TODO  
**Estimated Effort:** 2 hours  
**Type:** Code — TMA SDK integration

---

## Goal

Add Telegram's native haptic feedback to all key user interactions so the app feels physically responsive — a critical part of the "native Telegram feel."

---

## Acceptance Criteria

- [ ] Number pad: light impact haptic on every digit/backspace press
- [ ] Successful log submission: success notification haptic
- [ ] Delete confirmation: warning notification haptic (before the confirm dialog)
- [ ] Paywall unlock (after payment): success notification haptic
- [ ] Onboarding category selection: selection changed haptic
- [ ] Error states (e.g., trying to submit $0): error notification haptic
- [ ] All haptic calls are wrapped in try/catch or null-checked — no crashes in browser
- [ ] Haptic abstraction available as a utility module (not raw WebApp calls scattered everywhere)

---

## Estimated Effort

**2 hours**
- 30 min: Haptic utility module
- 30 min: Wire to number pad
- 30 min: Wire to log submit, delete, unlock
- 30 min: Wire to onboarding selection + test on real device

---

## Dependencies

- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — WebApp available
- [epic-002 screens](../epic-002-core-screens/) — screens to add haptics to

---

## Notes / Implementation Hints

### Haptic Utility Module

```typescript
// src/utils/haptics.ts
import WebApp from '@twa-dev/sdk';

// Safely call haptics — no-op outside TMA
function safeHaptic(fn: () => void) {
  try {
    fn();
  } catch {
    // Ignore — running in browser or unsupported platform
  }
}

export const haptics = {
  /** Light tap — use for key presses */
  keyPress() {
    safeHaptic(() => WebApp.HapticFeedback.impactOccurred('light'));
  },

  /** Medium impact — use for selections, category picks */
  select() {
    safeHaptic(() => WebApp.HapticFeedback.selectionChanged());
  },

  /** Success — use after transaction saved, after unlock */
  success() {
    safeHaptic(() => WebApp.HapticFeedback.notificationOccurred('success'));
  },

  /** Warning — use before destructive actions */
  warning() {
    safeHaptic(() => WebApp.HapticFeedback.notificationOccurred('warning'));
  },

  /** Error — use for validation failures */
  error() {
    safeHaptic(() => WebApp.HapticFeedback.notificationOccurred('error'));
  },

  /** Heavy impact — use for big reveals (e.g., annual number appears) */
  reveal() {
    safeHaptic(() => WebApp.HapticFeedback.impactOccurred('heavy'));
  },
};
```

### Telegram HapticFeedback API Reference

```
HapticFeedback.impactOccurred(style)
  style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
  Use: physical impact feel (key presses, button taps)

HapticFeedback.notificationOccurred(type)
  type: 'error' | 'success' | 'warning'
  Use: event outcomes (saved, deleted, error)

HapticFeedback.selectionChanged()
  Use: item selection in list/grid (one-time on select)
```

### Usage Examples

```typescript
// In NumberPad.tsx
import { haptics } from '../utils/haptics';

function handleKey(key: string) {
  haptics.keyPress(); // ← add this
  if (key === '⌫') {
    onBackspace();
  } else {
    onDigit(key);
  }
}
```

```typescript
// In LogScreen.tsx — on successful add
haptics.success(); // ← add before/after the DB write
await addTransaction({ ... });
```

```typescript
// In HistoryScreen.tsx — before showing delete confirm
haptics.warning(); // ← add before WebApp.showConfirm()
const confirmed = await confirmDelete(tx);
```

```typescript
// In OnboardingScreen.tsx — on category selection
function handleSelect(id: string) {
  haptics.select(); // ← add on selection
  setSelectedId(id);
}
```

```typescript
// In StatsScreen.tsx — on annual number reveal (unlocked state)
// Trigger once when the full stats first become visible
useEffect(() => {
  if (unlocked && stats && stats.projectedAnnual > 0) {
    haptics.reveal(); // ← single heavy impact when the big number appears
  }
}, [unlocked]);
```

### Testing Haptics

Haptics **only work on physical devices** — not in Telegram Desktop, not in the browser simulator.

Test on:
1. **Android**: Open bot in Telegram Android app → tap Menu button → your Mini App
2. **iOS**: Same via Telegram iOS app

Both should produce distinct vibration patterns for each haptic type.

### Platform Support

- Android: All haptic types supported
- iOS: Most types supported (some map to the same physical sensation)
- Telegram Desktop (Windows/Mac/Linux): Haptics silently ignored (no hardware)
- Browser: `@twa-dev/sdk` no-ops or throws — handled by `safeHaptic` wrapper

### Why This Matters

A number pad without haptics feels dead on mobile. Even subtle `light` feedback on digit presses makes the app feel significantly more polished. This is a 2-hour investment that makes the app feel 10× more native.
