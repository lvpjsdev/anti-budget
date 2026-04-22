import { useMemo } from 'react';
import { useSettings, useCategories } from '../hooks/useDb';
import { transactionService, settingsService } from '../db';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { categories } = useCategories();
  const selectedId = settings?.selectedCategoryId || null;

  const handleCategoryChange = async (categoryId: string) => {
    await updateSettings({ selectedCategoryId: categoryId });
  };

  const handleDeleteData = async () => {
    if (!confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
      return;
    }
    await transactionService.deleteAll();
    await settingsService.reset();
    // Refresh page to reset state
    window.location.reload();
  };

  // Group categories by some grouping? Just display all.
  const categoriesList = useMemo(() => categories, [categories]);

  return (
    <div className="min-h-screen bg-tg-bg p-4">
      <h1 className="text-2xl font-bold text-tg-text mb-6">Settings</h1>

      {/* Category selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-tg-text mb-3">Your habit</h2>
        <div className="grid grid-cols-2 gap-3">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`p-4 rounded-xl border-2 transition-colors flex flex-col items-center ${
                selectedId === cat.id
                  ? 'border-tg-button bg-tg-secondary'
                  : 'border-transparent bg-tg-secondary'
              }`}
            >
              <span className="text-4xl mb-2">{cat.emoji}</span>
              <span className={`text-sm ${selectedId === cat.id ? 'text-tg-button font-medium' : 'text-tg-text'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-lg font-semibold text-red-500 mb-3">Danger Zone</h2>
        <button
          onClick={handleDeleteData}
          className="w-full py-3 rounded-xl bg-red-500 text-white font-medium active:opacity-80"
        >
          Delete All Data
        </button>
      </section>
    </div>
  );
}
