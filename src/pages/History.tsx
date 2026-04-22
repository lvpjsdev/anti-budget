import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useAllTransactions, useCategories } from '../hooks/useDb';

export default function History() {
  const { transactions, loading, deleteTransaction } = useAllTransactions();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { categories } = useCategories();

  // Group transactions by month
  const grouped = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};
    transactions.forEach(tx => {
      const monthKey = tx.date.slice(0, 7); // "YYYY-MM"
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(tx);
    });
    // Sort keys descending (most recent first)
    const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
    return { groups, sortedKeys };
  }, [transactions]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTransaction(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-tg-bg text-tg-text">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tg-bg p-4">
      <h1 className="text-2xl font-bold text-tg-text mb-4">History</h1>

      {grouped.sortedKeys.length === 0 ? (
        <p className="text-tg-hint text-center">No transactions yet.</p>
      ) : (
        <div className="space-y-6">
          {grouped.sortedKeys.map(monthKey => {
            const monthTxns = grouped.groups[monthKey];
            const monthTotal = monthTxns.reduce((sum, tx) => sum + tx.amount, 0);
            let monthLabel: string;
            try {
              monthLabel = format(parseISO(`${monthKey}-01`), 'MMMM yyyy');
            } catch {
              monthLabel = monthKey;
            }
            return (
              <div key={monthKey} className="bg-tg-secondary rounded-xl overflow-hidden">
                <div className="p-4 border-b border-tg-hint flex justify-between items-center">
                  <h2 className="text-tg-text font-semibold">{monthLabel}</h2>
                  <span className="text-tg-text font-bold">${monthTotal.toFixed(2)}</span>
                </div>
                <ul className="divide-y divide-tg-hint">
                  {monthTxns.map(tx => {
                    const category = categories.find(c => c.id === tx.categoryId);
                    return (
                      <li
                        key={tx.id}
                        className="p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category?.emoji || '❓'}</span>
                          <div>
                            <p className="text-tg-text">{category?.name || tx.categoryId}</p>
                            <p className="text-tg-hint text-sm">{tx.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-tg-text">${tx.amount.toFixed(2)}</span>
                          <button
                            onClick={() => handleDelete(tx.id)}
                            disabled={deletingId === tx.id}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
