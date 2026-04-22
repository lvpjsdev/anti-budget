# Task 002: Logger Screen

**Epic:** epic-002-core-screens  
**Status:** 🔲 TODO  
**Estimated Effort:** 6 hours  
**Type:** Code — UI screen (primary daily action)

---

## Goal

Build the primary daily action screen: a fast, touch-optimized expense logger where the user can enter an amount and optional note in under 5 seconds, with immediate visual and haptic feedback on save.

---

## Acceptance Criteria

- [ ] Screen is the default view (index route `/`)
- [ ] Number pad renders with digits 0–9, decimal point, and backspace
- [ ] Amount display updates in real-time as keys are pressed (formatted: `$0.00` style)
- [ ] Decimal handling: only one decimal point allowed; max 2 decimal digits
- [ ] Optional note field: single-line text input, max 64 chars, initially collapsed/hidden
- [ ] "Add expense" button (or Telegram MainButton) submits when amount > 0
- [ ] On submit: transaction saved to IndexedDB, display resets to `$0.00`, success flash shown
- [ ] Success feedback: brief green flash or "✓ Added" message visible for ~1.5 seconds
- [ ] Haptic feedback on key press (via WebApp.HapticFeedback — degrades gracefully outside TMA)
- [ ] Category name + emoji displayed at top so user remembers what they're tracking
- [ ] If category not set → redirected to onboarding (handled by Layout)
- [ ] Entire flow from screen open to saved: < 5 seconds
- [ ] Works on 375px width viewport

---

## Estimated Effort

**6 hours**
- 1.5h: Number pad component
- 1.5h: Amount state management + formatting
- 1h: Note input (toggle visibility)
- 1h: Submit + success feedback
- 1h: Haptics + Telegram MainButton integration

---

## Dependencies

- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — `addTransaction()` available
- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — `WebApp.HapticFeedback` available
- [epic-001/task-004](../epic-001-project-scaffold/task-004-routing.md) — routing in place
- [task-001-onboarding-screen.md](./task-001-onboarding-screen.md) — category exists in DB

---

## Notes / Implementation Hints

### Amount State Management

```typescript
// Amount is stored as a string to make decimal entry feel natural
// "5" → "5." → "5.5" → "5.50"
// Display: format for readability; store as float on save

function useAmountInput() {
  const [raw, setRaw] = useState('');

  const display = raw === '' ? '0' : raw;
  const value = parseFloat(raw) || 0;

  function pressDigit(digit: string) {
    // Prevent leading zeros (except "0.")
    if (raw === '0' && digit !== '.') return;
    // Prevent multiple decimal points
    if (digit === '.' && raw.includes('.')) return;
    // Limit to 2 decimal places
    const decimalPos = raw.indexOf('.');
    if (decimalPos !== -1 && raw.length - decimalPos > 2) return;

    setRaw(prev => prev + digit);
  }

  function pressBackspace() {
    setRaw(prev => prev.slice(0, -1));
  }

  function reset() {
    setRaw('');
  }

  return { raw, display, value, pressDigit, pressBackspace, reset };
}
```

### Number Pad Layout

```
[1] [2] [3]
[4] [5] [6]
[7] [8] [9]
[.] [0] [⌫]
```

```typescript
// src/components/NumberPad.tsx
const PAD_KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
] as const;

interface NumberPadProps {
  onDigit: (key: string) => void;
  onBackspace: () => void;
}

export function NumberPad({ onDigit, onBackspace }: NumberPadProps) {
  function handleKey(key: string) {
    WebApp.HapticFeedback?.impactOccurred('light');
    if (key === '⌫') {
      onBackspace();
    } else {
      onDigit(key);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {PAD_KEYS.flat().map((key) => (
        <button
          key={key}
          onPointerDown={() => handleKey(key)}  // onPointerDown for faster response
          className="h-14 rounded-xl bg-tg-secondary-bg text-tg-text text-xl font-medium
                     active:bg-tg-hint/30 transition-colors select-none"
        >
          {key}
        </button>
      ))}
    </div>
  );
}
```

> Use `onPointerDown` instead of `onClick` — saves ~100ms latency on mobile taps.

### Full Logger Screen

```typescript
// src/screens/LogScreen.tsx
import { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { NumberPad } from '../components/NumberPad';
import { useCategory } from '../hooks/useDb';
import { addTransaction } from '../db';

export function LogScreen() {
  const { category } = useCategory();
  const { display, value, pressDigit, pressBackspace, reset } = useAmountInput();
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAdd() {
    if (value <= 0 || !category) return;

    WebApp.HapticFeedback?.notificationOccurred('success');

    await addTransaction({
      categoryId: category.id,
      amount: value,
      note: note.trim() || undefined,
      timestamp: Date.now(),
    });

    reset();
    setNote('');
    setShowNote(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  }

  return (
    <div className="flex flex-col h-full p-4 bg-tg-bg">
      {/* Category label */}
      <div className="text-center mb-4">
        <span className="text-2xl">{category?.emoji}</span>
        <p className="text-tg-hint text-sm mt-1">{category?.name}</p>
      </div>

      {/* Amount display */}
      <div className="flex-1 flex items-center justify-center">
        <div className={[
          'text-6xl font-bold tabular-nums transition-colors',
          success ? 'text-green-500' : 'text-tg-text',
        ].join(' ')}>
          ${display}
        </div>
      </div>

      {/* Success flash */}
      {success && (
        <div className="text-center text-green-500 text-sm font-medium mb-2">
          ✓ Added
        </div>
      )}

      {/* Note toggle + input */}
      <div className="mb-3">
        {!showNote ? (
          <button
            onClick={() => setShowNote(true)}
            className="text-tg-link text-sm w-full text-center py-2"
          >
            + Add note (optional)
          </button>
        ) : (
          <input
            type="text"
            placeholder="What was it? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={64}
            autoFocus
            className="w-full bg-tg-secondary-bg text-tg-text placeholder-tg-hint
                       rounded-xl px-4 py-3 outline-none text-sm"
          />
        )}
      </div>

      {/* Number Pad */}
      <NumberPad onDigit={pressDigit} onBackspace={pressBackspace} />

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={value <= 0}
        className={[
          'mt-3 w-full py-4 rounded-2xl font-semibold text-lg transition-all',
          value > 0
            ? 'bg-tg-button text-tg-button-text active:opacity-80'
            : 'bg-tg-hint/20 text-tg-hint',
        ].join(' ')}
      >
        Add {value > 0 ? `$${display}` : ''}
      </button>
    </div>
  );
}
```

### Currency Symbol

The hardcoded `$` is a placeholder. In task epic-003 (settings), we'll read from `Settings.currency`. For now `$` is fine for the MVP.

### Telegram MainButton Integration (epic-003 will do this properly)

If you want to try it early:
```typescript
useEffect(() => {
  if (value > 0) {
    WebApp.MainButton.setText(`Add $${display}`);
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(handleAdd);
  } else {
    WebApp.MainButton.hide();
  }
  return () => WebApp.MainButton.offClick(handleAdd);
}, [value]);
```

### Performance Requirement

The number pad MUST feel instant — zero lag between tap and digit appearing.
- Use `onPointerDown` (not `onClick`)
- Keep component re-renders minimal (only re-render the display, not the whole pad)
- No heavy computation on keystroke

### Kilo CLI Prompt

```bash
kilo run --auto "Build LogScreen React component for anti-budget app.
Custom number pad (0-9, decimal, backspace). Amount display in large text.
Optional note input (collapsed by default). On submit: call addTransaction() from db,
show success flash, reset to zero. Haptic on keypress via WebApp.HapticFeedback (graceful fallback).
Tailwind, TypeScript, --tg-* CSS vars. src/screens/LogScreen.tsx"
```
