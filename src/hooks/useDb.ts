import { useEffect, useState, useCallback } from 'react';
import { categoryService, settingsService, transactionService } from '../db';
import type { Category, Settings, Transaction } from '../db/schema';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAll(). then(setCategories).finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const s = await settingsService.getSettings();
    setSettings(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    const updated = await settingsService.updateSettings(patch);
    setSettings(updated);
    return updated;
  }, []);

  return { settings, loading, updateSettings, refresh };
}

export function useSelectedCategory(settings?: Settings | null) {
  const { categories } = useCategories();
  const selectedId = settings?.selectedCategoryId || null;
  const selectedCategory = categories.find(c => c.id === selectedId) || null;
  const setCategory = async (categoryId: string | null) => {
    await settingsService.setSelectedCategory(categoryId);
  };

  return { selectedCategory, selectedCategoryId: selectedId, setCategory };
}

export function useTransactionsByMonth(year: number, month: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionService.getTransactionsByMonth(year, month)
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, [year, month]);

  const addTransaction = useCallback(async (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
    const created = await transactionService.addTransaction(tx);
    setTransactions(prev => [...prev, created]);
    return created;
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    await transactionService.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  return { transactions, loading, addTransaction, deleteTransaction };
}

export function useAllTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionService.getAllTransactions()
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    await transactionService.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  return { transactions, loading, deleteTransaction };
}
