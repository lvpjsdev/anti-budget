# Task 001: Shame Card Generator

**Epic:** epic-004-share-mechanic  
**Status:** 🔲 TODO  
**Estimated Effort:** 5 hours  
**Type:** Code — Canvas image generation

---

## Goal

Generate a visually appealing shareable image card using the HTML Canvas API, displaying the user's category, annual spending amount, and "= X equivalent" — ready to be exported as a PNG blob for sharing.

---

## Acceptance Criteria

- [ ] `generateShameCard(data: ShameCardData): Promise<Blob>` function exists in `src/utils/shameCard.ts`
- [ ] Card is rendered at 1200×630px (OpenGraph standard, works well in Telegram)
- [ ] Card shows: category emoji (large), "I spent", dollar amount (very large, bold), category name, "this year", "That's [emoji] [equivalent]", bot link
- [ ] Background uses a gradient (shame colors — dark red/purple or theme blue)
- [ ] Text is white, legible
- [ ] Function returns a `Blob` of type `image/png`
- [ ] Card renders correctly for amounts < $100, $100–$999, $1,000–$9,999, $10,000+
- [ ] Card renders with custom category names (not just presets)
- [ ] No external image libraries required (Canvas API only)
- [ ] Runs in browser (no Node.js canvas)

---

## Estimated Effort

**5 hours**
- 1.5h: Canvas setup + layout math
- 1.5h: Typography + color work
- 1h: Testing different amounts + category names
- 1h: Edge cases (long category names, large numbers, dark/light variants)

---

## Dependencies

- [epic-002/task-003](../epic-002-core-screens/task-003-shame-stats-screen.md) — stats data available
- [epic-001/task-002](../epic-001-project-scaffold/task-002-indexeddb-schema.md) — category and settings available

---

## Notes / Implementation Hints

### ShameCardData Type

```typescript
// src/utils/shameCard.ts

export interface ShameCardData {
  categoryName: string;    // "Coffee"
  categoryEmoji: string;   // "☕"
  annualAmount: number;    // 1524.32
  currency: string;        // "USD" — use for symbol lookup
  equivalent: string;      // "a flight to Tokyo"
  equivalentEmoji: string; // "✈️"
  botUsername: string;     // "AntiBudgetBot"
}
```

### Card Generator Function

```typescript
export async function generateShameCard(data: ShameCardData): Promise<Blob> {
  const W = 1200;
  const H = 630;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // ── Background gradient ──────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#1a1a2e');  // deep navy
  grad.addColorStop(0.5, '#16213e'); // dark blue
  grad.addColorStop(1, '#0f3460');  // Telegram blue-ish
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle texture overlay (noise dots) ──────────────────────
  // Skip for MVP — clean gradient is fine

  // ── Category Emoji ───────────────────────────────────────────
  ctx.font = '96px Arial'; // Emoji render best with system font
  ctx.textAlign = 'center';
  ctx.fillText(data.categoryEmoji, W / 2, 150);

  // ── "I spent" label ──────────────────────────────────────────
  ctx.font = '500 40px -apple-system, "Helvetica Neue", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText('I spent', W / 2, 240);

  // ── Big Amount ────────────────────────────────────────────────
  const symbol = getCurrencySymbol(data.currency);
  const formattedAmount = `${symbol}${Math.round(data.annualAmount).toLocaleString('en-US')}`;

  // Dynamic font size based on string length
  const amountFontSize = formattedAmount.length > 8 ? 110 : formattedAmount.length > 6 ? 130 : 150;
  ctx.font = `800 ${amountFontSize}px -apple-system, "Helvetica Neue", sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(formattedAmount, W / 2, 390);

  // ── "on [category] this year" ────────────────────────────────
  ctx.font = '500 40px -apple-system, "Helvetica Neue", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText(`on ${data.categoryName.toLowerCase()} this year`, W / 2, 455);

  // ── Equivalent ────────────────────────────────────────────────
  ctx.font = '500 36px -apple-system, "Helvetica Neue", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(`That's ${data.equivalentEmoji} ${data.equivalent}`, W / 2, 525);

  // ── Bot Link ──────────────────────────────────────────────────
  ctx.font = '400 28px -apple-system, "Helvetica Neue", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.40)';
  ctx.fillText(`t.me/${data.botUsername}`, W / 2, 600);

  // ── Export as PNG Blob ────────────────────────────────────────
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate image'));
    }, 'image/png');
  });
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$', EUR: '€', RUB: '₽', GBP: '£', JPY: '¥',
  };
  return symbols[currency] ?? '$';
}
```

### Preview Component (for testing the card design)

Before wiring to the share flow, render the canvas inline for visual testing:

```typescript
// src/components/ShameCardPreview.tsx — DEBUG ONLY, remove before launch
import { useEffect, useRef } from 'react';
import { generateShameCard } from '../utils/shameCard';

export function ShameCardPreview() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    generateShameCard({
      categoryName: 'Coffee',
      categoryEmoji: '☕',
      annualAmount: 1524,
      currency: 'USD',
      equivalent: 'a flight to Tokyo',
      equivalentEmoji: '✈️',
      botUsername: 'AntiBudgetBot',
    }).then((blob) => {
      const url = URL.createObjectURL(blob);
      if (imgRef.current) imgRef.current.src = url;
    });
  }, []);

  return (
    <img
      ref={imgRef}
      style={{ width: '100%', borderRadius: 8 }}
      alt="Shame card preview"
    />
  );
}
```

### Design Variations to Consider

**Option A: Dark gradient (shame purple)** — recommended for emotional impact
- `#1a1a2e → #4a0e8f` (dark purple gradient)

**Option B: Telegram blue**
- `#0f3460 → #2481cc` — feels on-brand, familiar

**Option C: Minimalist white** (for users who don't want "dark vibes")
- White background, black text, colored amount

For MVP, go with Option A (dark gradient). It's more shareable / screenshot-worthy.

### Font Rendering Note

Canvas emoji rendering is system-dependent. Emoji fonts vary between Android, iOS, and desktop.

- On Android: Google's Noto Color Emoji
- On iOS: Apple Color Emoji  
- On desktop: varies

This means the card will look slightly different on different devices — acceptable for MVP.

### Testing Edge Cases

Test with these data scenarios:
- Very long category: "Energy drinks & sodas" — might overflow line
- Large amount: $15,000 — adjust font size down
- Small amount: $23 — should still look good
- Currency: ₽ 47,000 — ensure RTL-adjacent characters render correctly
