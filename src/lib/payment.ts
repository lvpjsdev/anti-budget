import WebApp from '@twa-dev/sdk';

// Telegram Stars payment integration for Anti-Budget
// Premium tiers and purchase flow

export interface PremiumTier {
  id: string;
  name: string;
  price: number; // in Stars
  features: string[];
  description?: string;
}

export const PREMIUM_TIERS: PremiumTier[] = [
  {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    price: 99, // ~$1-2 in Stars value
    description: 'One month of premium features',
    features: [
      'Remove all ads',
      'Unlimited history',
      'Export to CSV',
      'Advanced statistics',
      'Shame card sharing'
    ]
  },
  {
    id: 'premium_lifetime',
    name: 'Premium Lifetime',
    price: 499, // ~$5-7 in Stars value
    description: 'Forever access to all premium features',
    features: [
      'All monthly features forever',
      'Priority support',
      'Early access to new features',
      'Custom shame card colors'
    ]
  }
];

// Get premium status from localStorage
export function getPremiumStatus(): { tier: string | null; expiresAt: number | null } {
  try {
    const stored = localStorage.getItem('anti-budget-premium');
    if (!stored) return { tier: null, expiresAt: null };
    const data = JSON.parse(stored);
    
    // Check expiry
    if (data.expiresAt && Date.now() > data.expiresAt) {
      localStorage.removeItem('anti-budget-premium');
      return { tier: null, expiresAt: null };
    }
    return data;
  } catch {
    return { tier: null, expiresAt: null };
  }
}

// Set premium status (in production, verify via webhook)
export function setPremiumStatus(tier: string, expiresAt: number | null = null): void {
  localStorage.setItem('anti-budget-premium', JSON.stringify({ tier, expiresAt }));
}

// Check if current user has active premium
export function hasPremium(): boolean {
  return !!getPremiumStatus().tier;
}

// Purchase a premium tier using Telegram Stars
// In production, this calls your backend which creates an invoice via Bot API
export async function purchasePremium(tier: PremiumTier): Promise<boolean> {
  try {
    // In production:
    // 1. Call backend: fetch('/api/create-invoice', { tierId })
    // 2. Backend creates invoice via Telegram Bot API
    // 3. Returns invoice_link
    // 4. Frontend opens: WebApp.openInvoice(invoiceLink, callback)
    // 5. Telegram sends webhook to backend on success
    // 6. Backend grants premium, sends confirmation
    
    // For now: DEMO MODE — grants premium locally for testing
    // Replace this block with real Stars purchase flow
    
    const confirmed = confirm(
      `💎 Purchase ${tier.name} for ${tier.price} Stars?\n\n` +
      `Features:\n${tier.features.map(f => '• ' + f).join('\n')}\n\n` +
      `⚠️ This is a demo. In production, you would pay via Telegram Stars.`
    );

    if (confirmed) {
      // Grant premium (demo mode)
      // In production, this would be set after webhook confirmation
      const expiresAt = tier.id === 'premium_monthly'
        ? Date.now() + 30 * 24 * 60 * 60 * 1000
        : null; // Lifetime = no expiry
      
      setPremiumStatus(tier.id, expiresAt);
      
      // Haptic feedback
      try {
        WebApp.HapticFeedback.notificationOccurred('success');
      } catch {}
      
      // Show success message
      try {
        WebApp.showAlert(
          `✅ ${tier.name} activated!\n\n` +
          `You now have access to all premium features.\n` +
          `Thank you for supporting Anti-Budget! 💎`
        );
      } catch {
        alert(`${tier.name} activated!`);
      }
      
      return true;
    }
  } catch (err) {
    console.error('Purchase failed:', err);
  }
  return false;
}

// Clear premium status
export function clearPremiumStatus(): void {
  localStorage.removeItem('anti-budget-premium');
}