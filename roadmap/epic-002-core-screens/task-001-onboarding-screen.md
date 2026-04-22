# Task 001: Onboarding Screen

**Epic:** epic-002-core-screens  
**Status:** 🔲 TODO  
**Estimated Effort:** 4 hours  
**Type:** Code — UI screen

---

## Goal

Build a full-screen onboarding flow where the user selects exactly ONE spending habit from 8 presets (or enters a custom one) — with a live annual cost preview — then saves and enters the main app.

---

## Acceptance Criteria

- [ ] Screen renders when no category is set in IndexedDB (first launch)
- [ ] 8 preset categories displayed in a 2×4 or responsive grid: Coffee ☕, Delivery 🍕, Taxi 🚕, Cigarettes 🚬, Alcohol 🍺, Gaming 🎮, Shopping 🛍️, Custom ✏️
- [ ] Only ONE category can be selected at a time (selecting a new one deselects the previous)
- [ ] Selected state is visually distinct (border, background, or checkmark)
- [ ] "Custom" option opens an inline text input for category name + emoji picker (or emoji text input)
- [ ] Live preview below the grid shows: `"If you spend $5/day on [habit], that's $1,825/year"`
  - Preview uses the selected category name
  - $5/day is a default assumption (user doesn't input a number yet)
- [ ] "Start tracking →" button is disabled until a category is selected
- [ ] Tapping "Start tracking →" saves the category to IndexedDB and navigates to `'/'` (LogScreen)
- [ ] Onboarding screen is NOT shown again after category is saved (Layout redirects to main app)
- [ ] Screen renders correctly on 375px width (iPhone SE)
- [ ] No TypeScript errors

---

## Estimated Effort

**4 hours**
- 1h: Category grid layout + selection logic
- 1h: Custom category input
- 45 min: Live preview section
- 45 min: Save + navigation
- 30 min: Polish + mobile test

---

## Dependencies

- [epic-001/task-001](../epic-001-project-scaffold/task-001-vite-react-setup.md) — project exists
- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — `setCategory()` and `getCategory()` available
- [epic-001/task-004](../epic-001-project-scaffold/task-004-routing.md) — routing + Layout redirect to onboarding

---

## Notes / Implementation Hints

### Preset Categories Data

```typescript
// src/data/categories.ts
export const PRESET_CATEGORIES = [
  { id: 'coffee',    name: 'Coffee',     emoji: '☕' },
  { id: 'delivery', name: 'Delivery',   emoji: '🍕' },
  { id: 'taxi',     name: 'Taxi',       emoji: '🚕' },
  { id: 'smoking',  name: 'Cigarettes', emoji: '🚬' },
  { id: 'alcohol',  name: 'Alcohol',    emoji: '🍺' },
  { id: 'gaming',   name: 'Gaming',     emoji: '🎮' },
  { id: 'shopping', name: 'Shopping',   emoji: '🛍️' },
  { id: 'custom',   name: 'Custom',     emoji: '✏️' },
] as const;
```

### Component Structure

```typescript
// src/screens/OnboardingScreen.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRESET_CATEGORIES } from '../data/categories';
import { useCategory } from '../hooks/useDb';
import type { Category } from '../db/schema';

export function OnboardingScreen() {
  const navigate = useNavigate();
  const { saveCategory } = useCategory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [customEmoji, setCustomEmoji] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedPreset = PRESET_CATEGORIES.find(c => c.id === selectedId);
  const isCustom = selectedId === 'custom';

  // Determine display name for the live preview
  const displayName = isCustom
    ? (customName || 'your habit')
    : (selectedPreset?.name.toLowerCase() ?? 'your habit');

  const canProceed = selectedId !== null && (!isCustom || customName.trim().length > 0);

  async function handleStart() {
    if (!canProceed || saving) return;
    setSaving(true);

    const category: Category = isCustom
      ? {
          id: crypto.randomUUID(),
          name: customName.trim(),
          emoji: customEmoji.trim() || '✏️',
          createdAt: Date.now(),
        }
      : {
          id: selectedPreset!.id,
          name: selectedPreset!.name,
          emoji: selectedPreset!.emoji,
          createdAt: Date.now(),
        };

    await saveCategory(category);
    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen bg-tg-bg flex flex-col p-6">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-tg-text text-2xl font-bold leading-tight">
          Pick your one bad habit
        </h1>
        <p className="text-tg-hint text-sm mt-2">
          You can't add more. That's the point.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {PRESET_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedId(cat.id)}
            className={[
              'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all',
              selectedId === cat.id
                ? 'border-tg-button bg-tg-button/10 text-tg-text'
                : 'border-tg-hint/20 bg-tg-secondary-bg text-tg-text',
            ].join(' ')}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className="font-medium text-sm">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Custom Input (shows when "Custom" selected) */}
      {isCustom && (
        <div className="mb-6 p-4 bg-tg-secondary-bg rounded-2xl">
          <input
            type="text"
            placeholder="Habit name (e.g. Energy drinks)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            maxLength={32}
            className="w-full bg-transparent text-tg-text placeholder-tg-hint outline-none text-base mb-2"
            autoFocus
          />
          <input
            type="text"
            placeholder="Emoji (optional, e.g. 🥤)"
            value={customEmoji}
            onChange={(e) => setCustomEmoji(e.target.value)}
            maxLength={4}
            className="w-full bg-transparent text-tg-text placeholder-tg-hint outline-none text-sm"
          />
        </div>
      )}

      {/* Live Preview */}
      {selectedId && (
        <div className="mb-8 p-4 bg-tg-secondary-bg rounded-2xl text-center">
          <p className="text-tg-hint text-xs mb-1">If you spend $5/day on</p>
          <p className="text-tg-text font-bold text-lg">{displayName}</p>
          <p className="text-tg-hint text-xs mt-1">that's</p>
          <p className="text-tg-button text-3xl font-bold mt-1">$1,825/year</p>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button */}
      <button
        onClick={handleStart}
        disabled={!canProceed || saving}
        className={[
          'w-full py-4 rounded-2xl font-semibold text-lg transition-all',
          canProceed
            ? 'bg-tg-button text-tg-button-text active:scale-98'
            : 'bg-tg-hint/30 text-tg-hint cursor-not-allowed',
        ].join(' ')}
      >
        {saving ? 'Saving...' : 'Start tracking →'}
      </button>
    </div>
  );
}
```

### Shame Intro Text (for the header area)

Consider adding a hook-line above the grid:

```
"Every $5.50 coffee = $2,013/year.
Pick your habit."
```

This plants the annualized shock framing before the user even selects anything — primes them for the stats screen reveal.

### Kilo CLI Prompt

```bash
kilo run --auto "Create OnboardingScreen React component for anti-budget app.
Category picker grid (2 cols), 8 presets with emoji. Single select only.
Custom option shows text input. Live preview shows '$1,825/year' with selected category name.
Disabled CTA until selection. On confirm: save to IndexedDB via saveCategory() hook, navigate to '/'.
Use Tailwind with --tg-* CSS custom properties for all colors. TypeScript. src/screens/OnboardingScreen.tsx"
```
