import { useState } from 'react';
import { useTransactionsByMonth, useSettings, useSelectedCategory } from '../hooks/useDb';
import { format } from 'date-fns';
import WebApp from '@twa-dev/sdk';

export default function Logger() {
  const [amount, setAmount] = useState('');
  const { transactions, addTransaction } = useTransactionsByMonth(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  const { settings } = useSettings();
  const { selectedCategory } = useSelectedCategory(settings);

  const handleSave = async () => {
    const value = parseFloat(amount);
    if (!value || value <= 0 || !selectedCategory) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    await addTransaction({
      categoryId: selectedCategory.id,
      amount: value,
      date: today,
    });

    // Haptic feedback
    WebApp.HapticFeedback.impactOccurred('heavy');

    setAmount('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-tg-bg p-4">
      <div className="w-full max-w-xs">
        {/* Selected category display */}
        {selectedCategory ? (
          <div className="flex flex-col items-center mb-8">
            <span className="text-6xl mb-2">{selectedCategory.emoji}</span>
            <span className="text-tg-text text-lg font-medium">{selectedCategory.name}</span>
          </div>
        ) : (
          <p className="text-tg-hint text-center mb-6">
            No category selected. Go to Settings to choose one.
          </p>
        )}

        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-tg-hint text-sm mb-2">Amount ($)</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-4 rounded-xl bg-tg-secondary text-tg-text text-2xl text-center outline-none border-2 border-transparent focus:border-tg-button"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full py-4 rounded-xl bg-tg-button text-tg-button-text font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
        >
          Save
        </button>

        {/* Recent log summary */}
        <div className="mt-8">
          <h3 className="text-tg-text font-medium mb-2">Today's total</h3>
          {transactions.length > 0 ? (
            <p className="text-3xl font-bold text-tg-text">
              ${transactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)}
            </p>
          ) : (
            <p className="text-tg-hint">No entries yet</p>
          )}
        </div>
      </div>
    </div>
  );
}