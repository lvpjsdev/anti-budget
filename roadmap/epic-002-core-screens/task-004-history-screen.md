# Task 004: History Screen

**Epic:** epic-002-core-screens  
**Status:** 🔲 TODO  
**Estimated Effort:** 4 hours  
**Type:** Code — UI screen

---

## Goal

Build a scrollable transaction history screen showing all logged expenses newest-first, with the ability to delete individual entries via long-press or swipe, with a confirmation dialog.

---

## Acceptance Criteria

- [ ] Screen accessible via `/history` route and "History 📋" tab
- [ ] All transactions displayed, newest first
- [ ] Each row shows: amount (bold), category emoji, note (if any), and relative time ("2h ago", "Yesterday", "Mar 15")
- [ ] Transactions are grouped by date ("Today", "Yesterday", "April 19", etc.)
- [ ] Delete available via: long-press on a row OR visible delete button/icon
- [ ] Confirmation dialog before delete (uses `WebApp.showConfirm()` in TMA, or native `confirm()` in browser)
- [ ] After delete: row removed from list, stats screen will reflect change on next visit
- [ ] Empty state shown when no transactions exist
- [ ] Free tier: shows last 30 transactions; older ones hidden behind paywall teaser
- [ ] Unlocked tier: shows full history
- [ ] List is performant — scrolls smoothly with 100+ entries
- [ ] No TypeScript errors

---

## Estimated Effort

**4 hours**
- 1h: Data fetching + grouping by date
- 1.5h: Transaction row component + list rendering
- 45 min: Delete (long-press + confirm)
- 45 min: Paywall limit for free tier + empty state

---

## Dependencies

- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — `getAllTransactions()`, `deleteTransaction()`
- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — `WebApp.showConfirm()`
- [task-001-onboarding-screen.md](./task-001-onboarding-screen.md) — category available

---

## Notes / Implementation Hints

### Date Grouping Logic

```typescript
// src/utils/groupByDate.ts
import { formatRelative, isToday, isYesterday, format } from 'date-fns';

export interface TransactionGroup {
  label: string; // "Today", "Yesterday", "April 19"
  transactions: Transaction[];
}

export function groupTransactionsByDate(transactions: Transaction[]): TransactionGroup[] {
  const groups = new Map<string, Transaction[]>();

  for (const tx of transactions) {
    const date = new Date(tx.timestamp);
    let label: string;

    if (isToday(date)) {
      label = 'Today';
    } else if (isYesterday(date)) {
      label = 'Yesterday';
    } else {
      label = format(date, 'MMMM d'); // "April 19"
    }

    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(tx);
  }

  return Array.from(groups.entries()).map(([label, transactions]) => ({
    label,
    transactions,
  }));
}
```

### Relative Time for Row Display

```typescript
import { formatDistanceToNow } from 'date-fns';

function relativeTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  // "2 hours ago", "about 3 hours ago", "yesterday"
}
```

### History Screen Component

```typescript
// src/screens/HistoryScreen.tsx
import { useEffect, useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { getAllTransactions, deleteTransaction } from '../db';
import { useSettings, useCategory } from '../hooks/useDb';
import { groupTransactionsByDate } from '../utils/groupByDate';
import type { Transaction } from '../db/schema';

const FREE_TIER_LIMIT = 30;

export function HistoryScreen() {
  const { category } = useCategory();
  const { unlocked } = useSettings();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = useCallback(async () => {
    const all = await getAllTransactions();
    setTransactions(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  async function handleDelete(tx: Transaction) {
    const confirmed = await new Promise<boolean>((resolve) => {
      if (typeof WebApp.showConfirm === 'function') {
        WebApp.showConfirm(
          `Delete $${tx.amount.toFixed(2)}${tx.note ? ` — "${tx.note}"` : ''}?`,
          resolve
        );
      } else {
        resolve(window.confirm(`Delete this entry: $${tx.amount.toFixed(2)}?`));
      }
    });

    if (confirmed) {
      await deleteTransaction(tx.id);
      setTransactions(prev => prev.filter(t => t.id !== tx.id));
    }
  }

  if (loading) return <div className="p-6 text-tg-hint text-sm">Loading...</div>;

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <span className="text-5xl mb-4">📋</span>
        <h2 className="text-tg-text font-bold text-xl mb-2">Nothing here yet</h2>
        <p className="text-tg-hint text-sm">Your logged expenses will appear here.</p>
      </div>
    );
  }

  // Apply free tier limit
  const displayedTransactions = unlocked
    ? transactions
    : transactions.slice(0, FREE_TIER_LIMIT);
  const hasMore = !unlocked && transactions.length > FREE_TIER_LIMIT;

  const groups = groupTransactionsByDate(displayedTransactions);

  return (
    <div className="pb-6 bg-tg-bg min-h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-tg-text text-xl font-bold">
          {category?.emoji} {category?.name} history
        </h1>
        <p className="text-tg-hint text-sm mt-1">
          {transactions.length} expense{transactions.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {/* Transaction Groups */}
      {groups.map((group) => (
        <div key={group.label}>
          <div className="px-4 py-2 text-tg-hint text-xs uppercase tracking-wider font-medium">
            {group.label}
          </div>
          <div className="px-4 space-y-2">
            {group.transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                categoryEmoji={category?.emoji ?? '•'}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Paywall teaser for older entries */}
      {hasMore && (
        <div className="mx-4 mt-4 p-4 bg-tg-secondary-bg rounded-2xl text-center">
          <p className="text-tg-text text-sm font-semibold mb-1">
            +{transactions.length - FREE_TIER_LIMIT} older entries
          </p>
          <p className="text-tg-hint text-xs mb-3">
            Unlock full history with lifetime access
          </p>
          <button
            onClick={() => {/* epic-003: open paywall */}}
            className="bg-tg-button text-tg-button-text px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Unlock — $4.99
          </button>
        </div>
      )}
    </div>
  );
}
```

### Transaction Row Component

```typescript
// src/components/TransactionRow.tsx
import { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Transaction } from '../db/schema';

interface Props {
  transaction: Transaction;
  categoryEmoji: string;
  onDelete: (tx: Transaction) => void;
}

export function TransactionRow({ transaction: tx, categoryEmoji, onDelete }: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout>>();

  function handlePointerDown() {
    longPressTimer.current = setTimeout(() => setShowDelete(true), 500);
  }

  function handlePointerUp() {
    clearTimeout(longPressTimer.current);
  }

  return (
    <div
      className="flex items-center justify-between bg-tg-secondary-bg rounded-xl px-4 py-3"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{categoryEmoji}</span>
        <div>
          <p className="text-tg-text font-semibold">
            ${tx.amount.toFixed(2)}
          </p>
          {tx.note && (
            <p className="text-tg-hint text-xs mt-0.5">{tx.note}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-tg-hint text-xs">
          {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
        </span>
        {showDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(tx); setShowDelete(false); }}
            className="text-tg-destructive text-sm font-medium px-2 py-1"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
```

### Performance Note

For 100+ transactions, consider virtualization with `react-window` or `react-virtual`. For the MVP with a free tier limit of 30 visible rows, standard DOM rendering is fine.

### Kilo CLI Prompt

```bash
kilo run --auto "Build HistoryScreen for anti-budget app. 
Fetch all transactions from IndexedDB, group by date (Today/Yesterday/April 19).
Each row: emoji, amount, note, relative time. Long-press shows delete button.
Delete uses WebApp.showConfirm() with fallback to window.confirm().
Free tier: show only last 30 entries, then paywall teaser.
Tailwind, TypeScript, --tg-* CSS vars. src/screens/HistoryScreen.tsx"
```
