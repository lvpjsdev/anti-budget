import { useMemo } from 'react';
import { useTransactionsByMonth, useSettings, useSelectedCategory } from '../hooks/useDb';
import { format } from 'date-fns';

export default function ShameStats() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const { transactions, loading } = useTransactionsByMonth(year, month);
  const { settings } = useSettings();
  const { selectedCategory } = useSelectedCategory(settings);

  const monthTotal = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const annualProjection = monthTotal * 12;
  const transactionCount = transactions.length;

  // Generate a comparison text based on average per-transaction amount and number of entries
  const comparisonText = useMemo(() => {
    if (transactionCount === 0) return 'No spending logged yet.';
    const avg = monthTotal / transactionCount;
    return `Avg ${avg.toFixed(2)} per entry across ${transactionCount} transaction${transactionCount !== 1 ? 's' : ''}`;
  }, [monthTotal, transactionCount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-tg-bg text-tg-text">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-tg-bg min-h-screen">
      <h1 className="text-2xl font-bold text-tg-text mb-6">Shame Stats</h1>

      {/* Shame card visual */}
      <div className="w-full max-w-sm bg-tg-secondary rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          {selectedCategory ? (
            <span className="text-4xl">{selectedCategory.emoji}</span>
          ) : (
            <span className="text-4xl">💸</span>
          )}
          <span className="text-tg-hint text-sm">
            {format(new Date(), 'MMMM yyyy')}
          </span>
        </div>

        <div className="text-5xl font-bold text-tg-text mb-2">
          ${monthTotal.toFixed(2)}
        </div>

        <div className="text-tg-hint">
          {comparisonText}
        </div>
      </div>

      {/* Annual projection */}
      <div className="w-full max-w-sm bg-tg-secondary rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-tg-text mb-2">Projected Annual</h2>
        <div className="text-3xl font-bold text-tg-text">
          ${annualProjection.toFixed(2)}
        </div>
        <p className="text-tg-hint text-sm mt-1">
          if this month repeats every month
        </p>
      </div>

      {/* Share button placeholder */}
      <button
        className="w-full max-w-sm py-3 rounded-xl bg-tg-button text-tg-button-text font-medium"
        // onClick={() => shareShameCard(monthTotal, selectedCategory?.name)}
      >
        📤 Share Shame
      </button>
    </div>
  );
}
