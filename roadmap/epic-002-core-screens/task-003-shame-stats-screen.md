# Task 003: Shame Stats Screen

**Epic:** epic-002-core-screens  
**Status:** 🔲 TODO  
**Estimated Effort:** 6 hours  
**Type:** Code — UI screen (core value prop)

---

## Goal

Build the Shame Stats screen — the heart of the product. Displays this month's total, this year's total, the annualized projection, and a "= X equivalent" that makes the number feel viscerally real. The annual projection feature is gated behind the paywall for free users.

---

## Acceptance Criteria

- [ ] Screen accessible via `/stats` route and "Stats 📊" tab
- [ ] This month's total displayed prominently (always visible, free tier)
- [ ] Day-of-month progress shown: "Day 14 of 31 — you're on track for $X this month"
- [ ] Annual projection displayed (gated — blurred/hidden for non-unlocked users)
- [ ] "= X equivalent" displayed below annual projection (also gated)
- [ ] Paywall teaser rendered for locked users: blurred number + "Unlock to see your annual total" button
- [ ] For unlocked users: both annual projection AND equivalent are fully visible
- [ ] Numbers animate/count up on first render (CSS transition or simple JS counter)
- [ ] Category name + emoji shown at the top
- [ ] Empty state handled: "No expenses logged yet. Log your first one →" with tap to navigate to Log tab
- [ ] Numbers refresh when the screen is focused (e.g., after logging a new expense)
- [ ] No TypeScript errors

---

## Estimated Effort

**6 hours**
- 1h: Data fetching + calculations
- 1.5h: UI layout (free tier + locked sections)
- 1h: Paywall blur/teaser component
- 1h: "= X equivalent" logic
- 30 min: Count-up animation
- 1h: Edge cases + empty state + refresh on focus

---

## Dependencies

- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — `getTransactionsByMonth()`, `getAllTransactions()`, `getSettings()`
- [task-001-onboarding-screen.md](./task-001-onboarding-screen.md) — category set
- [task-002-logger-screen.md](./task-002-logger-screen.md) — transactions exist to display

---

## Notes / Implementation Hints

### Calculation Logic

```typescript
// src/utils/stats.ts
import { startOfMonth, endOfMonth, getDaysInMonth, getDate } from 'date-fns';

export interface MonthStats {
  monthTotal: number;        // Sum of this month's transactions
  projectedAnnual: number;   // monthTotal / daysElapsed * 365
  projectedMonthEnd: number; // monthTotal / daysElapsed * daysInMonth
  daysElapsed: number;
  daysInMonth: number;
  equivalent: string;        // "a flight to Tokyo"
  equivalentEmoji: string;   // "✈️"
}

export function calcMonthStats(transactions: Transaction[]): MonthStats {
  const now = new Date();
  const daysElapsed = getDate(now); // 1-31
  const daysInMonth = getDaysInMonth(now);

  const monthTotal = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  // Annualize: extrapolate current pace to full year
  const dailyRate = daysElapsed > 0 ? monthTotal / daysElapsed : 0;
  const projectedAnnual = dailyRate * 365;
  const projectedMonthEnd = dailyRate * daysInMonth;

  const { text, emoji } = getEquivalent(projectedAnnual);

  return {
    monthTotal,
    projectedAnnual,
    projectedMonthEnd,
    daysElapsed,
    daysInMonth,
    equivalent: text,
    equivalentEmoji: emoji,
  };
}
```

### "Shame Equivalents" — The Core Emotional Hook

```typescript
// src/data/equivalents.ts
// Annual amount → what you could have bought instead

interface Equivalent {
  minAmount: number; // Annual USD threshold
  text: string;
  emoji: string;
}

export const EQUIVALENTS: Equivalent[] = [
  { minAmount: 5000, text: 'a MacBook Pro',         emoji: '💻' },
  { minAmount: 3000, text: 'a European vacation',   emoji: '🏖️' },
  { minAmount: 2000, text: 'a flight to Tokyo',     emoji: '✈️' },
  { minAmount: 1500, text: 'a weekend trip',        emoji: '🏨' },
  { minAmount: 1000, text: '2 months of groceries', emoji: '🛒' },
  { minAmount: 600,  text: 'a new iPhone (used)',   emoji: '📱' },
  { minAmount: 400,  text: '6 months of Netflix',   emoji: '📺' },
  { minAmount: 200,  text: 'a nice dinner for two', emoji: '🍽️' },
  { minAmount: 100,  text: '15 fancy coffees',      emoji: '☕' },
  { minAmount: 0,    text: 'a few nice lunches',    emoji: '🥗' },
];

export function getEquivalent(annualAmount: number): { text: string; emoji: string } {
  const match = EQUIVALENTS.find(e => annualAmount >= e.minAmount);
  return match ?? EQUIVALENTS[EQUIVALENTS.length - 1];
}
```

### Screen Layout

```typescript
// src/screens/StatsScreen.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactionsByMonth } from '../db';
import { useSettings, useCategory } from '../hooks/useDb';
import { calcMonthStats } from '../utils/stats';

export function StatsScreen() {
  const navigate = useNavigate();
  const { category } = useCategory();
  const { settings, unlocked } = useSettings();
  const [stats, setStats] = useState<MonthStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    const now = new Date();
    const txs = await getTransactionsByMonth(now.getFullYear(), now.getMonth());
    setStats(calcMonthStats(txs));
    setLoading(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  // Refresh when tab becomes visible (after logging)
  useEffect(() => {
    const handler = () => { if (document.visibilityState === 'visible') loadStats(); };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  if (loading) return <LoadingState />;
  if (!stats || stats.monthTotal === 0) return <EmptyState onLog={() => navigate('/')} />;

  return (
    <div className="p-6 bg-tg-bg min-h-full">
      {/* Category header */}
      <div className="text-center mb-8">
        <span className="text-4xl">{category?.emoji}</span>
        <p className="text-tg-hint text-sm mt-2">
          Day {stats.daysElapsed} of {stats.daysInMonth}
        </p>
      </div>

      {/* This month — always visible */}
      <div className="text-center mb-8">
        <p className="text-tg-hint text-xs uppercase tracking-wider mb-1">
          This month
        </p>
        <AnimatedNumber
          value={stats.monthTotal}
          className="text-6xl font-bold text-tg-text tabular-nums"
          prefix="$"
        />
        <p className="text-tg-hint text-sm mt-2">
          on track for ${Math.round(stats.projectedMonthEnd)} by month end
        </p>
      </div>

      {/* Annual projection — GATED */}
      {unlocked ? (
        <div className="text-center bg-tg-secondary-bg rounded-3xl p-6">
          <p className="text-tg-hint text-xs uppercase tracking-wider mb-1">
            This year (projected)
          </p>
          <AnimatedNumber
            value={stats.projectedAnnual}
            className="text-5xl font-bold text-tg-button tabular-nums"
            prefix="$"
          />
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-2xl">{stats.equivalentEmoji}</span>
            <p className="text-tg-text text-sm">= {stats.equivalent}</p>
          </div>
        </div>
      ) : (
        <PaywallTeaser
          previewAmount={stats.projectedAnnual}
          equivalent={stats.equivalent}
          equivalentEmoji={stats.equivalentEmoji}
        />
      )}
    </div>
  );
}

function PaywallTeaser({ previewAmount, equivalent, equivalentEmoji }) {
  return (
    <div className="relative bg-tg-secondary-bg rounded-3xl p-6 overflow-hidden">
      {/* Blurred preview */}
      <div className="blur-sm select-none">
        <p className="text-tg-hint text-xs text-center uppercase tracking-wider mb-1">
          This year (projected)
        </p>
        <p className="text-5xl font-bold text-tg-button tabular-nums text-center">
          ${Math.round(previewAmount)}
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-2xl">{equivalentEmoji}</span>
          <p className="text-tg-text text-sm">= {equivalent}</p>
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-tg-bg/80 rounded-3xl p-4">
        <p className="text-tg-text font-semibold text-center mb-3">
          Unlock your annual total
        </p>
        <button
          onClick={() => {/* epic-003: paywall handler */}}
          className="bg-tg-button text-tg-button-text px-6 py-3 rounded-xl font-semibold text-sm"
        >
          Unlock lifetime stats — $4.99
        </button>
      </div>
    </div>
  );
}
```

### AnimatedNumber Component

```typescript
// src/components/AnimatedNumber.tsx
import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  prefix?: string;
  className?: string;
}

export function AnimatedNumber({ value, prefix = '', className }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const frameRef = useRef<number>();
  const startRef = useRef<number>();
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const duration = 600; // ms

    function step(timestamp: number) {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(from + (to - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
      else fromRef.current = to;
    }

    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value]);

  return (
    <span className={className}>
      {prefix}{displayed.toLocaleString()}
    </span>
  );
}
```

### Empty State

```typescript
function EmptyState({ onLog }: { onLog: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <span className="text-5xl mb-4">📊</span>
      <h2 className="text-tg-text font-bold text-xl mb-2">No data yet</h2>
      <p className="text-tg-hint text-sm mb-6">
        Log your first expense to see how it adds up.
      </p>
      <button
        onClick={onLog}
        className="bg-tg-button text-tg-button-text px-6 py-3 rounded-xl font-semibold"
      >
        Log your first expense →
      </button>
    </div>
  );
}
```
