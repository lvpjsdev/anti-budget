# Task 002: IndexedDB Schema & Data Layer

**Epic:** epic-001-project-scaffold  
**Status:** 🔲 TODO  
**Estimated Effort:** 4 hours  
**Type:** Code — Data layer

---

## Goal

Define the complete IndexedDB schema and create a typed TypeScript wrapper using the `idb` library so all screens can read/write data through clean, testable functions — with zero direct IndexedDB API calls in UI components.

---

## Acceptance Criteria

- [ ] `src/db/schema.ts` defines TypeScript interfaces for all 3 entities: `Category`, `Transaction`, `Settings`
- [ ] `src/db/index.ts` exports named functions for all CRUD operations (see list below)
- [ ] `src/hooks/useDb.ts` React hook provides DB access with loading states
- [ ] Database opens with correct version (1) and creates all object stores
- [ ] `addTransaction()` correctly stores a transaction and returns its ID
- [ ] `getTransactionsByMonth(year, month)` returns only transactions in that month
- [ ] `getSettings()` returns defaults if no settings saved yet
- [ ] `setCategory()` replaces any existing category (only one allowed)
- [ ] All functions handle errors gracefully (no uncaught promise rejections)
- [ ] Manual test: add transaction → reload page → transaction visible in DevTools > Application > IndexedDB
- [ ] TypeScript compiles with 0 errors

---

## Estimated Effort

**4 hours**
- 30 min: Schema design + interface definitions
- 1.5h: idb wrapper implementation
- 1h: React hook
- 1h: Manual testing in browser + DevTools inspection

---

## Dependencies

- [task-001-vite-react-setup.md](./task-001-vite-react-setup.md) — project must exist

---

## Notes / Implementation Hints

### Schema Definition

```typescript
// src/db/schema.ts

export interface Category {
  id: string;           // UUID (crypto.randomUUID())
  name: string;         // "Coffee", "UberEats", etc.
  emoji: string;        // "☕", "🍕", etc.
  createdAt: number;    // Unix timestamp ms
}

export interface Transaction {
  id: string;           // UUID
  categoryId: string;   // FK to Category.id
  amount: number;       // In user's currency, e.g. 5.50
  note?: string;        // Optional short note
  timestamp: number;    // Unix timestamp ms (when the expense occurred)
  createdAt: number;    // Unix timestamp ms (when it was logged — may differ)
}

export interface Settings {
  id: 'singleton';      // Only one record ever, keyed to 'singleton'
  currency: string;     // 'USD', 'RUB', 'EUR', etc.
  unlocked: boolean;    // True if paywall unlocked
  unlockCode?: string;  // Store the code used (for PWA unlock)
  reminderEnabled: boolean;
  reminderTime?: string; // "09:00" in HH:MM format
  locale: string;       // 'en', 'ru', etc.
  createdAt: number;
  updatedAt: number;
}

// Default settings
export const DEFAULT_SETTINGS: Settings = {
  id: 'singleton',
  currency: 'USD',
  unlocked: false,
  reminderEnabled: false,
  locale: 'en',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// DB schema type for idb
export interface AntibudgetDB {
  categories: {
    key: string;
    value: Category;
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-timestamp': number; 'by-category': string };
  };
  settings: {
    key: 'singleton';
    value: Settings;
  };
}
```

### DB Wrapper

```typescript
// src/db/index.ts
import { openDB, type IDBPDatabase } from 'idb';
import type { AntibudgetDB, Category, Transaction, Settings } from './schema';
import { DEFAULT_SETTINGS } from './schema';

const DB_NAME = 'anti-budget';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AntibudgetDB>> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<AntibudgetDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Categories store
        db.createObjectStore('categories', { keyPath: 'id' });
        
        // Transactions store with indexes
        const txStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txStore.createIndex('by-timestamp', 'timestamp');
        txStore.createIndex('by-category', 'categoryId');
        
        // Settings store
        db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

// ── Category ─────────────────────────────────────────────────────────────────

export async function setCategory(category: Category): Promise<void> {
  const db = await getDb();
  // Delete all existing categories first (enforce one-category rule)
  const existing = await db.getAll('categories');
  const tx = db.transaction('categories', 'readwrite');
  for (const cat of existing) {
    await tx.store.delete(cat.id);
  }
  await tx.store.put(category);
  await tx.done;
}

export async function getCategory(): Promise<Category | undefined> {
  const db = await getDb();
  const all = await db.getAll('categories');
  return all[0];
}

// ── Transactions ──────────────────────────────────────────────────────────────

export async function addTransaction(tx: Omit<Transaction, 'id' | 'createdAt'>): Promise<string> {
  const db = await getDb();
  const id = crypto.randomUUID();
  const record: Transaction = {
    ...tx,
    id,
    createdAt: Date.now(),
  };
  await db.add('transactions', record);
  return id;
}

export async function deleteTransaction(id: string): Promise<void> {
  const db = await getDb();
  await db.delete('transactions', id);
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await getDb();
  // Returns newest first
  const all = await db.getAllFromIndex('transactions', 'by-timestamp');
  return all.reverse();
}

export async function getTransactionsByMonth(year: number, month: number): Promise<Transaction[]> {
  // month is 0-indexed (0 = January)
  const start = new Date(year, month, 1).getTime();
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();
  const db = await getDb();
  const range = IDBKeyRange.bound(start, end);
  const result = await db.getAllFromIndex('transactions', 'by-timestamp', range);
  return result.reverse(); // newest first
}

export async function getTransactionCount(): Promise<number> {
  const db = await getDb();
  return db.count('transactions');
}

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const db = await getDb();
  const settings = await db.get('settings', 'singleton');
  return settings ?? DEFAULT_SETTINGS;
}

export async function updateSettings(patch: Partial<Omit<Settings, 'id'>>): Promise<void> {
  const db = await getDb();
  const current = await getSettings();
  const updated: Settings = {
    ...current,
    ...patch,
    id: 'singleton',
    updatedAt: Date.now(),
  };
  await db.put('settings', updated);
}

export async function setUnlocked(unlocked: boolean, code?: string): Promise<void> {
  await updateSettings({ unlocked, unlockCode: code });
}
```

### React Hook

```typescript
// src/hooks/useDb.ts
import { useState, useEffect, useCallback } from 'react';
import * as db from '../db';
import type { Category, Transaction, Settings } from '../db/schema';

export function useCategory() {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getCategory().then((cat) => {
      setCategory(cat);
      setLoading(false);
    });
  }, []);

  const saveCategory = useCallback(async (cat: Category) => {
    await db.setCategory(cat);
    setCategory(cat);
  }, []);

  return { category, loading, saveCategory };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    db.getSettings().then(setSettings);
  }, []);

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    await db.updateSettings(patch);
    const updated = await db.getSettings();
    setSettings(updated);
  }, []);

  return { settings, updateSettings, unlocked: settings?.unlocked ?? false };
}
```

### Why `idb` over raw IndexedDB

`idb` is a tiny (< 1KB gzip) wrapper that:
- Converts callback-based IDB API to Promises
- Provides TypeScript generics for type safety
- Handles the boilerplate of transaction creation
- No lock-in — it's just a thin veneer, not a framework

**Install:** Already included in task-001 deps (`npm install idb`)

### Testing Tip

Open Chrome DevTools → Application tab → Storage → IndexedDB → anti-budget

You should see:
- `categories` store (with your one category)
- `transactions` store (with indexes)
- `settings` store (with the singleton record)

To reset during dev: Right-click `anti-budget` in DevTools → Delete database.
