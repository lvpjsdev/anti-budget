# Task 002: Share Sheet

**Epic:** epic-004-share-mechanic  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Code — Share flow integration

---

## Goal

Wire the shame card generator to the "Share my shame 😭" button on the Stats screen, using Telegram's native share API when inside TMA and the Web Share API as a fallback for PWA/browser.

---

## Acceptance Criteria

- [ ] "Share my shame 😭" button visible on Stats screen when `projectedAnnual > 0`
- [ ] Tapping the button calls `generateShameCard()` and shows a brief loading state
- [ ] **In TMA:** uses `WebApp.switchInlineQuery()` OR `WebApp.openTelegramLink()` to share a pre-formatted text message + bot link
- [ ] **In PWA/browser:** uses `navigator.share()` (Web Share API) with the generated image as a file
- [ ] **Fallback:** if neither TMA share nor Web Share is available → shows a "copy link" button with the pre-written message
- [ ] Shared text includes: amount, category, equivalent, bot link
- [ ] Loading state shows a spinner while the card is being generated (< 500ms typically)
- [ ] Error is caught gracefully (e.g., user denies share permission)
- [ ] Button is only shown to users with sufficient data (≥ 7 days logged, or at least $10 total)

---

## Estimated Effort

**3 hours**
- 45 min: Share button UI on Stats screen
- 1h: TMA share flow + text message construction
- 45 min: Web Share API fallback + copy fallback
- 30 min: Loading state + error handling

---

## Dependencies

- [task-001-shame-card-generator.md](./task-001-shame-card-generator.md) — `generateShameCard()` must exist
- [epic-002/task-003](../epic-002-core-screens/task-003-shame-stats-screen.md) — Stats screen exists
- [epic-001/task-003](../epic-001-project-scaffold/task-003-twa-sdk-setup.md) — `useTelegram()` hook

---

## Notes / Implementation Hints

### Share Strategy by Platform

```
Is inside Telegram?
  ├── YES → Use WebApp.openTelegramLink() with t.me/share URL
  └── NO  → navigator.share() available?
              ├── YES → share({ title, text, files: [cardImage] })
              └── NO  → copy pre-written message to clipboard + show toast
```

### Pre-Written Share Message

```typescript
// src/utils/shareText.ts

export function buildShareMessage(data: {
  categoryEmoji: string;
  categoryName: string;
  annualAmount: number;
  currency: string;
  equivalent: string;
  equivalentEmoji: string;
  botUsername: string;
}): string {
  const symbol = getCurrencySymbol(data.currency);
  const amount = `${symbol}${Math.round(data.annualAmount).toLocaleString('en-US')}`;
  
  return [
    `I spent ${amount} on ${data.categoryName.toLowerCase()} this year ${data.categoryEmoji}`,
    `That's ${data.equivalentEmoji} ${data.equivalent}`,
    '',
    `Track your habit 👉 t.me/${data.botUsername}`,
  ].join('\n');
}
```

### Share Handler

```typescript
// src/utils/share.ts
import WebApp from '@twa-dev/sdk';
import { generateShameCard, type ShameCardData } from './shameCard';
import { buildShareMessage } from './shareText';

export async function shareShameCard(data: ShameCardData & { botUsername: string }): Promise<void> {
  const text = buildShareMessage(data);
  const isInTelegram = Boolean(WebApp.initData);

  if (isInTelegram) {
    // Telegram-native share: opens chat picker
    // Method 1: t.me/share/url — shares a URL with caption
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(`https://t.me/${data.botUsername}`);
    WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    );
    return;
  }

  // PWA / Browser: try Web Share API with image
  if (navigator.canShare) {
    try {
      const blob = await generateShameCard(data);
      const file = new File([blob], 'my-shame.png', { type: 'image/png' });
      
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My annual spending shame',
          text,
          files: [file],
        });
        return;
      }
    } catch (err) {
      // User cancelled or share failed — fall through to text-only share
      if ((err as Error).name === 'AbortError') return; // User cancelled — not an error
    }
  }

  // Text-only share (no image)
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch {
      // Fall through to clipboard
    }
  }

  // Clipboard fallback
  await navigator.clipboard.writeText(text);
  // Show toast: "Message copied to clipboard!"
}
```

### Stats Screen — Share Button

```typescript
// Add to StatsScreen.tsx

const [sharing, setSharing] = useState(false);

async function handleShare() {
  if (!stats || !category || !settings) return;
  setSharing(true);
  try {
    await shareShameCard({
      categoryName: category.name,
      categoryEmoji: category.emoji,
      annualAmount: stats.projectedAnnual,
      currency: settings.currency,
      equivalent: stats.equivalent,
      equivalentEmoji: stats.equivalentEmoji,
      botUsername: 'AntiBudgetBot', // TODO: make this configurable
    });
  } catch (err) {
    console.error('Share failed:', err);
  } finally {
    setSharing(false);
  }
}

// Show button only when there's meaningful data (≥$10 annual projection)
const canShare = stats && stats.projectedAnnual >= 10;

// In JSX — add below the stats content:
{canShare && (
  <button
    onClick={handleShare}
    disabled={sharing}
    className="mt-6 w-full py-4 rounded-2xl border-2 border-tg-button/30 
               text-tg-button font-semibold flex items-center justify-center gap-2
               active:bg-tg-button/10 transition-colors"
  >
    {sharing ? (
      <span className="text-tg-hint">Generating...</span>
    ) : (
      <>
        <span>😭</span>
        <span>Share my shame</span>
      </>
    )}
  </button>
)}
```

### Clipboard Toast

```typescript
// src/hooks/useToast.ts
import { useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  function show(msg: string, durationMs = 2000) {
    setMessage(msg);
    setTimeout(() => setMessage(null), durationMs);
  }

  return { message, show };
}

// In Layout.tsx or App.tsx:
// {toast.message && (
//   <div className="fixed bottom-24 left-4 right-4 bg-tg-text text-tg-bg 
//                   text-center py-2 px-4 rounded-xl text-sm z-50">
//     {toast.message}
//   </div>
// )}
```

### Telegram Share URL Notes

`https://t.me/share/url?url=...&text=...` opens Telegram's "Forward" UI where the user picks which chat to share to. This is the correct way to do it without needing the `inline_mode` bot setting.

**Alternative:** If your bot has inline mode enabled in BotFather:
```typescript
// Opens inline query in a chat the user chooses
WebApp.switchInlineQuery('my_annual_shame', ['users', 'groups', 'channels']);
```
This requires bot to have inline mode AND an inline query handler on the backend.

For MVP, stick with `t.me/share/url` — no backend required.

### Analytics Event

```typescript
// Track shares for growth metrics
umami?.track('share_tapped');
// After successful share:
umami?.track('share_completed', { method: isInTelegram ? 'telegram' : 'webshare' });
```
