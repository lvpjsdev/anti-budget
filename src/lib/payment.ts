import WebApp from '@twa-dev/sdk';

// Configuration - set these for production
const CONFIG = {
  // Your Cloudflare Worker URL after deployment
  workerUrl: '', // e.g., 'https://anti-budget-stars.your-name.workers.dev'
  // Or leave empty for demo mode
};

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

// Verify premium with backend (production)
async function verifyPremiumWithBackend(userId: string): Promise<boolean> {
  if (!CONFIG.workerUrl) return false;
  
  try {
    const response = await fetch(`${CONFIG.workerUrl}/api/premium?user_id=${userId}`);
    const data = await response.json();
    return data.premium === true;
  } catch {
    return false;
  }
}

// Purchase a premium tier using Telegram Stars
// In production, this calls your Cloudflare Worker which creates an invoice via Bot API
export async function purchasePremium(tier: PremiumTier): Promise<boolean> {
  try {
    // Get Telegram user info
    const user = WebApp.initDataUnsafe?.user;
    const userId = user?.id?.toString() || 'demo-user';
    
    // Check if we have a backend configured
    if (CONFIG.workerUrl) {
      // PRODUCTION MODE: Create invoice via Worker
      const response = await fetch(`${CONFIG.workerUrl}/api/create-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier_id: tier.id, user_id: userId })
      });
      
      if (!response.ok) {
        const error = await response.json();
        WebApp.showAlert(`Error: ${error.error || 'Failed to create invoice'}`);
        return false;
      }
      
      const { invoiceLink } = await response.json();
      
      // Open invoice in Telegram
      WebApp.openInvoice(invoiceLink, (status: string) => {
        if (status === 'paid') {
          // Verify payment
          setTimeout(async () => {
            const verified = await verifyPremiumWithBackend(userId);
            if (verified) {
              const expiresAt = tier.id === 'premium_monthly'
                ? Date.now() + 30 * 24 * 60 * 60 * 1000
                : null;
              setPremiumStatus(tier.id, expiresAt);
              WebApp.showAlert(`✅ ${tier.name} activated!`);
            }
          }, 2000);
        }
      });
      
      return true;
    }
    
    // DEMO MODE: Grant premium locally for testing (when no backend)
    const confirmed = confirm(
      `💎 Purchase ${tier.name} for ${tier.price} Stars?\n\n` +
      `Features:\n${tier.features.map(f => '• ' + f).join('\n')}\n\n` +
      `⚠️ This is a demo. In production, you would pay via Telegram Stars.`
    );

    if (confirmed) {
      // Grant premium (demo mode)
      const expiresAt = tier.id === 'premium_monthly'
        ? Date.now() + 30 * 24 * 60 * 60 * 1000
        : null;
      
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
    WebApp.showAlert(`Error: ${err}`);
  }
  return false;
}

// Clear premium status
export function clearPremiumStatus(): void {
  localStorage.removeItem('anti-budget-premium');
}

// Configure the worker URL (call this after deploying)
export function configureWorker(url: string): void {
  CONFIG.workerUrl = url;
}