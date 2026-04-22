import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Category, Transaction, Settings } from './schema';

interface AntiBudgetDB extends DBSchema {
  categories: {
    key: string;
    value: Category;
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-month': string };
  };
  settings: {
    key: 'singleton';
    value: Settings;
  };
}

const DB_NAME = 'anti-budget';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AntiBudgetDB>> | null = null;

function getDb(): Promise<IDBPDatabase<AntiBudgetDB>> {
  if (!dbPromise) {
    dbPromise = openDB<AntiBudgetDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('categories', { keyPath: 'id' });
        const txStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txStore.createIndex('by-month', 'timestamp');
        db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export async function setCategory(category: Category): Promise<void> {
  const db = await getDb();
  await db.put('categories', category);
}

export async function getCategory(): Promise<Category | undefined> {
  const db = await getDb();
  const categories = await db.getAll('categories');
  return categories[0];
}

export async function addTransaction(transaction: Transaction): Promise<void> {
  const db = await getDb();
  await db.put('transactions', transaction);
}

export async function deleteTransaction(id: string): Promise<void> {
  const db = await getDb();
  await db.delete('transactions', id);
}

export async function getTransactionsByMonth(year: number, month: number): Promise<Transaction[]> {
  const db = await getDb();
  const start = new Date(year, month, 1).getTime();
  const end = new Date(year, month + 1, 1).getTime();
  const all = await db.getAllFromIndex('transactions', 'by-month');
  return all.filter((tx) => tx.timestamp >= start && tx.timestamp < end);
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await getDb();
  return db.getAll('transactions');
}

export async function getSettings(): Promise<Settings | undefined> {
  const db = await getDb();
  return db.get('settings', 'singleton');
}

export async function updateSettings(settings: Settings): Promise<void> {
  const db = await getDb();
  await db.put('settings', settings);
}

export async function setUnlocked(unlocked: boolean): Promise<void> {
  const db = await getDb();
  const existing = await db.get('settings', 'singleton');
  const updated: Settings = {
    id: 'singleton',
    currency: existing?.currency ?? 'USD',
    unlocked,
    reminderEnabled: existing?.reminderEnabled ?? false,
    reminderTime: existing?.reminderTime ?? '09:00',
    locale: existing?.locale ?? 'en',
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  await db.put('settings', updated);
}