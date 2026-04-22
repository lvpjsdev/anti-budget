import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Transaction, Settings } from './schema';
import { DEFAULT_CATEGORIES } from './schema';

interface AntiBudgetDB extends DBSchema {
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-date': string; 'by-category': string };
  };
  settings: {
    key: string;
    value: Settings;
  };
}

const DB_NAME = 'anti-budget';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<AntiBudgetDB> | null = null;

async function getDB(): Promise<IDBPDatabase<AntiBudgetDB>> {
  if (dbInstance) return dbInstance;

  const db = await openDB<AntiBudgetDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('transactions')) {
        const txStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txStore.createIndex('by-date', 'date');
        txStore.createIndex('by-category', 'categoryId');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' });
      }
    },
  });

  // Initialize default settings if not present
  const existing = await db.get('settings', 'global');
  if (!existing) {
    await db.put('settings', { id: 'global', selectedCategoryId: null });
  }

  dbInstance = db;
  return db;
}

// Category methods - using static defaults; could be extended
export const categoryService = {
  getAll() {
    return Promise.resolve(DEFAULT_CATEGORIES);
  },
  getById(id: string) {
    return Promise.resolve(DEFAULT_CATEGORIES.find(c => c.id === id));
  },
};

// Transaction methods
export const transactionService = {
  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
    const db = await getDB();
    const id = crypto.randomUUID();
    const now = Date.now();
    const tx: Transaction = { ...transaction, id, createdAt: now };
    await db.put('transactions', tx);
    return tx;
  },

  async getTransactionsByMonth(year: number, month: number) {
    const db = await getDB();
    const tx = db.transaction('transactions');
    const index = tx.store.index('by-date');

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;

    const transactions: Transaction[] = [];
    let cursor = await index.openCursor(IDBKeyRange.bound(startDate, endDate, false, true));
    while (cursor) {
      transactions.push(cursor.value);
      cursor = await cursor.continue();
    }
    return transactions;
  },

  async getAllTransactions() {
    const db = await getDB();
    const tx = db.transaction('transactions');
    const index = tx.store.index('by-date');
    const transactions: Transaction[] = [];
    let cursor = await index.openCursor(null, 'prev');
    while (cursor) {
      transactions.push(cursor.value);
      cursor = await cursor.continue();
    }
    return transactions;
  },

  async deleteTransaction(id: string) {
    const db = await getDB();
    await db.delete('transactions', id);
  },

  async deleteAll() {
    const db = await getDB();
    const tx = db.transaction('transactions', 'readwrite');
    await tx.store.clear();
  },
};

// Settings methods
export const settingsService = {
  async getSettings(): Promise<Settings> {
    const db = await getDB();
    const s = await db.get('settings', 'global');
    if (!s) {
      const defaultSettings: Settings = { id: 'global', selectedCategoryId: null };
      await db.put('settings', defaultSettings);
      return defaultSettings;
    }
    return s;
  },

  async updateSettings(patch: Partial<Settings>): Promise<Settings> {
    const db = await getDB();
    const current = await this.getSettings();
    const updated: Settings = { ...current, ...patch };
    await db.put('settings', updated);
    return updated;
  },

  async setSelectedCategory(categoryId: string | null) {
    return this.updateSettings({ selectedCategoryId: categoryId });
  },

  async reset() {
    const db = await getDB();
    await db.put('settings', { id: 'global', selectedCategoryId: null });
  },
};
