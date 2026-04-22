import { useMemo, useState } from 'react';
import { useSettings, useCategories } from '../hooks/useDb';
import { transactionService, settingsService } from '../db';
import { PREMIUM_TIERS, hasPremium, purchasePremium } from '../lib/payment';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { categories } = useCategories();
  const selectedId = settings?.selectedCategoryId || null;
  const isPremium = hasPremium();
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handleCategoryChange = async (categoryId: string) => {
    await updateSettings({ selectedCategoryId: categoryId });
  };

  const handleDeleteData = async () => {
    if (!confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
      return;
    }
    await transactionService.deleteAll();
    await settingsService.reset();
    window.location.reload();
  };

  const handlePurchase = async (tierId: string) => {
    const tier = PREMIUM_TIERS.find(t => t.id === tierId);
    if (!tier) return;
    
    setPurchasing(tierId);
    try {
      const success = await purchasePremium(tier);
      if (success) {
        // Force re-render by updating a dummy state
        window.location.reload();
      }
    } finally {
      setPurchasing(null);
    }
  };

  const categoriesList = useMemo(() => categories, [categories]);

  return (
    <div className="min-h-screen bg-tg-bg p-4 pb-8">
      <h1 className="text-2xl font-bold text-tg-text mb-6">Settings</h1>

      {/* Premium Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-tg-text mb-3">
          {isPremium ? '⭐ Premium Active' : '⭐ Get Premium'}
        </h2>
        
        {isPremium ? (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
            <p className="text-yellow-500 font-medium">✓ Premium unlocked</p>
            <p className="text-tg-hint text-sm mt-1">Thank you for supporting Anti-Budget!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {PREMIUM_TIERS.map(tier => (
              <div
                key={tier.id}
                className="bg-tg-secondary rounded-xl p-4 border border-transparent hover:border-tg-button/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-tg-text font-semibold">{tier.name}</h3>
                    <p className="text-yellow-500 text-sm mt-1">💎 {tier.price} Stars</p>
                  </div>
                  <button
                    onClick={() => handlePurchase(tier.id)}
                    disabled={purchasing === tier.id}
                    className="px-4 py-2 rounded-xl bg-tg-button text-tg-button-text font-semibold text-sm disabled:opacity-50 active:scale-95 transition-all"
                  >
                    {purchasing === tier.id ? '...' : tier.id === 'premium_monthly' ? 'Buy Monthly' : 'Buy Lifetime'}
                  </button>
                </div>
                <ul className="space-y-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-tg-hint text-sm flex items-center gap-2">
                      <span>•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-tg-hint text-xs text-center mt-2">
              Powered by Telegram Stars
            </p>
          </div>
        )}
      </section>

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