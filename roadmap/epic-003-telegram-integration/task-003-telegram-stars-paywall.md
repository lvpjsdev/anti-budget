# Task 003: Telegram Stars Paywall + PWA Unlock

**Epic:** epic-003-telegram-integration  
**Status:** 🔲 TODO  
**Estimated Effort:** 6 hours  
**Type:** Code — Monetization (most complex task in this epic)

---

## Goal

Implement the end-to-end purchase flow: Telegram Stars payment for TMA users, one-time unlock code for PWA users. After successful payment/validation, `Settings.unlocked = true` is persisted in IndexedDB and all gated features become visible immediately.

---

## Acceptance Criteria

**Telegram Stars flow:**
- [ ] "Unlock — $4.99" button triggers Stars payment flow via `WebApp.openInvoice()`
- [ ] Invoice is fetched from a Cloudflare Worker (or equivalent minimal backend)
- [ ] Invoice is set for 250 Stars (≈ $4.99)
- [ ] On `status === 'paid'`: `setUnlocked(true)` called, UI updates immediately without reload
- [ ] On `status === 'cancelled'` or `'failed'`: user sees friendly message, nothing changes
- [ ] Payment works in Telegram Stars test mode (sandbox)

**PWA Unlock Code flow:**
- [ ] Settings screen has "Enter unlock code" input
- [ ] Code is validated against a static list or via a simple hash check (no real backend needed)
- [ ] Valid code: `setUnlocked(true)` + success feedback
- [ ] Invalid code: error message shown
- [ ] Code is stored in `Settings.unlockCode` (prevents re-entry)

**General:**
- [ ] After unlock: Stats screen annual projection becomes visible immediately
- [ ] After unlock: History shows full list (no 30-entry cap)
- [ ] Paywall teaser buttons/UI removed after unlock
- [ ] `Settings.unlocked` state is reactive — components update without page reload
- [ ] No TypeScript errors

---

## Estimated Effort

**6 hours**
- 2h: Cloudflare Worker setup + Telegram bot invoice creation
- 1.5h: Stars payment flow in TMA
- 1h: PWA unlock code flow
- 30 min: Reactive UI updates after unlock
- 1h: Test in Stars test mode + edge cases

---

## Dependencies

- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — `setUnlocked()` available
- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — `WebApp.openInvoice()` available
- [epic-002/task-003](../epic-002-core-screens/task-003-shame-stats-screen.md) — paywall teaser UI exists

---

## Notes / Implementation Hints

### Architecture Overview

```
[User taps "Unlock"]
       ↓
[App fetches invoice link from Cloudflare Worker]
       ↓
[Worker calls Telegram Bot API: createInvoiceLink]
       ↓
[Worker returns invoice URL to app]
       ↓
[App calls WebApp.openInvoice(url, callback)]
       ↓
[Telegram shows native Stars payment sheet]
       ↓
[User pays → callback fires with status='paid']
       ↓
[App calls setUnlocked(true) → IndexedDB updated]
       ↓
[UI reactively shows gated content]
```

### Cloudflare Worker — Invoice Creator

```typescript
// worker/create-invoice.ts
// Deploy to: https://anti-budget-invoice.YOUR_NAME.workers.dev

export default {
  async fetch(request: Request): Promise<Response> {
    // CORS for your GitHub Pages origin
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://lvpjsdev.github.io',
          'Access-Control-Allow-Methods': 'GET',
        },
      });
    }

    const BOT_TOKEN = env.BOT_TOKEN; // Set in Worker env vars (not in code!)
    const PRICE_STARS = 250; // ~$4.99

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Anti-Budget Lifetime Access',
          description: 'Unlock annual projections, full history, and shame equivalents — forever.',
          payload: 'lifetime_unlock_v1',
          currency: 'XTR', // XTR = Telegram Stars
          prices: [{ label: 'Lifetime unlock', amount: PRICE_STARS }],
        }),
      }
    );

    const data = await response.json() as { ok: boolean; result: string };
    
    if (!data.ok) {
      return new Response(JSON.stringify({ error: 'Failed to create invoice' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ invoiceLink: data.result }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://lvpjsdev.github.io',
      },
    });
  },
};
```

**Deploy:**
```bash
npm install -g wrangler
wrangler init anti-budget-invoice
# Copy worker code above
wrangler secret put BOT_TOKEN
wrangler deploy
```

### Client-Side Payment Trigger

```typescript
// src/hooks/usePaywall.ts
import WebApp from '@twa-dev/sdk';
import { setUnlocked } from '../db';

const INVOICE_WORKER_URL = 'https://anti-budget-invoice.YOUR_NAME.workers.dev';

export function usePaywall() {
  async function triggerStarsPayment() {
    try {
      // Fetch invoice link from worker
      const res = await fetch(INVOICE_WORKER_URL);
      const { invoiceLink } = await res.json() as { invoiceLink: string };

      // Open Telegram's native payment sheet
      WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          await setUnlocked(true);
          WebApp.showAlert('🎉 Unlocked! All features are now available.');
          // Trigger a re-render by dispatching a custom event
          window.dispatchEvent(new CustomEvent('unlock-changed'));
        } else if (status === 'cancelled') {
          // User closed the payment sheet — no action needed
        } else if (status === 'failed') {
          WebApp.showAlert('Payment failed. Please try again.');
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      WebApp.showAlert('Something went wrong. Please try again.');
    }
  }

  return { triggerStarsPayment };
}
```

### Reactive Settings Hook (Listen for Unlock Events)

```typescript
// Update src/hooks/useDb.ts — useSettings hook
export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  async function reload() {
    const s = await getSettings();
    setSettings(s);
  }

  useEffect(() => {
    reload();
    // Listen for unlock events (dispatched after Stars payment)
    window.addEventListener('unlock-changed', reload);
    return () => window.removeEventListener('unlock-changed', reload);
  }, []);

  // ... rest of the hook
}
```

### PWA Unlock Code Flow

For the PWA (where Telegram Stars isn't available), use a simple one-time code system:

**How it works:**
1. User buys on Gumroad/LemonSqueezy → webhook fires → generates a unique code → emails it
2. User enters code in the app → app validates it → unlocks

**MVP validation (no backend):**
Use a simple HMAC-based approach where codes are `sha256(secret + userId)` or just generate a fixed list of 100 codes at launch:

```typescript
// src/utils/unlockCode.ts

// In MVP: static list of pre-generated codes (stored hashed)
// Generate: node -e "for(let i=0;i<100;i++) console.log(crypto.randomUUID())"
// Hash them: sha256 of each code
// Store only hashes in the app (safe to ship in client code)

const VALID_CODE_HASHES = new Set([
  'a3f5b...', // sha256 of code-001
  'c7d2e...', // sha256 of code-002
  // ... up to 100 codes
]);

export async function validateUnlockCode(code: string): Promise<boolean> {
  const encoded = new TextEncoder().encode(code.trim().toUpperCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return VALID_CODE_HASHES.has(hashHex);
}
```

**Settings Screen unlock code UI:**
```typescript
function UnlockCodeInput() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

  async function handleSubmit() {
    setStatus('checking');
    const valid = await validateUnlockCode(code);
    if (valid) {
      await setUnlocked(true, code);
      window.dispatchEvent(new CustomEvent('unlock-changed'));
      setStatus('valid');
    } else {
      setStatus('invalid');
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter unlock code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="w-full bg-tg-secondary-bg text-tg-text px-4 py-3 rounded-xl"
        maxLength={36}
      />
      <button onClick={handleSubmit} className="mt-2 ...">
        {status === 'checking' ? 'Checking...' : 'Unlock'}
      </button>
      {status === 'invalid' && (
        <p className="text-tg-destructive text-sm mt-1">Invalid code. Check your email.</p>
      )}
      {status === 'valid' && (
        <p className="text-green-500 text-sm mt-1">✓ Unlocked!</p>
      )}
    </div>
  );
}
```

### Pricing Note

Telegram Stars rate: approximately 1 USD = 50 Stars (Telegram sets the rate, may vary by region).

- $4.99 → 250 Stars
- $6.99 → 350 Stars

Start with 250 Stars. You can change it later.

### Test Mode

Telegram provides Stars test mode:
1. In BotFather: `/mybots` → your bot → Bot Settings → Payments → Test Payments
2. In the Mini App test environment, use test card numbers
3. Stars test payments don't charge real money

Always test this in a real Telegram client on a real device — test mode doesn't work in browser.
