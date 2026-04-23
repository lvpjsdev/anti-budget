import WebApp from '@twa-dev/sdk';

// Configuration - set these for production
const CONFIG = {
  // Your Cloudflare Worker URL after deployment
  workerUrl: 'https://anti-budget-stars.anti-budget-stars.workers.dev',
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
    price: 99,
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
    price: 499,
    description: 'Forever access to all premium features',
    features: [
      'All monthly features forever',
      'Priority support',
      'Early access to new features',
      'Custom shame card colors'
    ]
  }
];

export function getPremiumStatus(): { tier: string | null; expiresAt: number | null } {
  try {
    const stored = localStorage.getItem('anti-budget-premium');
    if (!stored) return { tier: null, expiresAt: null };
    const data = JSON.parse(stored);
    if (data.expiresAt && Date.now() > data.expiresAt) {
      localStorage.removeItem('anti-budget-premium');
      return { tier: null, expiresAt: null };
    }
    return data;
  } catch {
    return { tier: null, expiresAt: null };
  }
}

export function setPremiumStatus(tier: string, expiresAt: number | null = null): void {
  localStorage.setItem('anti-budget-premium', JSON.stringify({ tier, expiresAt }));
}

export function hasPremium(): boolean {
  return !!getPremiumStatus().tier;
}

async function verifyPremiumWithBackend(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${CONFIG.workerUrl}/api/premium?user_id=${userId}`);
    const data = await response.json();
    return data.premium === true;
  } catch {
    return false;
  }
}

export async function purchasePremium(tier: PremiumTier): Promise<boolean> {
  try {
    const user = WebApp.initDataUnsafe?.user;
    const userId = user?.id?.toString() || 'demo-user';
    
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
    WebApp.openInvoice(invoiceLink, async (status: string) => {
      if (status === 'paid') {
        // Verify payment after short delay
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
  } catch (err) {
    console.error('Purchase failed:', err);
    WebApp.showAlert(`Error: ${err}`);
  }
  return false;
}

export function clearPremiumStatus(): void {
  localStorage.removeItem('anti-budget-premium');
}