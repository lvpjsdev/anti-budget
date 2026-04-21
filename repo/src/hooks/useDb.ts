import { useEffect, useState } from 'react';
import { getCategory, setCategory, getSettings, setUnlocked } from '../db';
import type { Category, Settings } from '../db/schema';

export function useCategory() {
  const [category, setCategoryState] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategory().then((cat) => {
      setCategoryState(cat ?? null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (category && !loading) {
      setCategory(category);
    }
  }, [category, loading]);

  return { category, loading, setCategory: setCategoryState };
}

export function useSettings() {
  const [settings, setSettingsState] = useState<Settings | null>(null);
  const [unlocked, setUnlockedState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then((s) => {
      setSettingsState(s ?? null);
      setUnlockedState(s?.unlocked ?? false);
      setLoading(false);
    });
  }, []);

  const updateUnlocked = (value: boolean) => {
    setUnlockedState(value);
    setUnlocked(value);
  };

  return { settings, unlocked, loading, setUnlocked: updateUnlocked };
}