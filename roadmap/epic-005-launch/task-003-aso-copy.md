# Task 003: PWA Meta Tags, OG Image & SEO Copy

**Epic:** epic-005-launch  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Code + copywriting — PWA discoverability

---

## Goal

Optimize the PWA landing page (`lvpjsdev.github.io/anti-budget`) for discoverability: compelling meta tags, a proper Open Graph image so links look great in Telegram/Twitter/Slack previews, and a short SEO-friendly description that ranks for long-tail queries.

---

## Acceptance Criteria

- [ ] `index.html` has `<title>`, `<meta name="description">`, all OG tags, and Twitter Card tags
- [ ] OG image exists at `/anti-budget/og-image.png` (1200×630px)
- [ ] OG image shows: app name, tagline, and a sample shame number (like the shame card design)
- [ ] Link preview tested in: Telegram, Twitter, Facebook, Slack — all show correct title + image
- [ ] Test via: `https://www.opengraph.xyz/url/https://lvpjsdev.github.io/anti-budget/`
- [ ] `manifest.json` has `description` field matching the meta description
- [ ] `robots.txt` exists and allows indexing
- [ ] Lighthouse SEO score ≥ 90

---

## Estimated Effort

**3 hours**
- 30 min: Write all copy variants + meta description
- 45 min: OG image creation (Canvas-based, similar to shame card)
- 1h: index.html meta tags + manifest description update
- 45 min: Testing with link preview tools

---

## Dependencies

- [epic-001/task-001](../epic-001-project-scaffold/task-001-vite-react-setup.md) — index.html accessible
- [epic-003/task-004](../epic-003-telegram-integration/task-004-pwa-service-worker.md) — manifest.json exists

---

## Notes / Implementation Hints

### Meta Tags for index.html

```html
<!-- index.html — add to <head> -->

<!-- Core SEO -->
<title>Anti-Budget — Track One Bad Habit. Confront the Annual Number.</title>
<meta name="description" content="Track just one spending habit — coffee, delivery, cigarettes. See the annual total. Die a little inside. No bank links. No subscription. Works offline.">

<!-- Open Graph (Telegram, Facebook, LinkedIn, Slack) -->
<meta property="og:title" content="Anti-Budget — Track One Bad Habit">
<meta property="og:description" content="You spent $1,524 on coffee this year. That's a flight to Tokyo. Track your one bad habit and see the annual number you've been avoiding.">
<meta property="og:image" content="https://lvpjsdev.github.io/anti-budget/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://lvpjsdev.github.io/anti-budget/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Anti-Budget">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Anti-Budget — Track One Bad Habit">
<meta name="twitter:description" content="Track just one spending habit. See the annual total. Die inside.">
<meta name="twitter:image" content="https://lvpjsdev.github.io/anti-budget/og-image.png">

<!-- Telegram specific (Telegram reads OG tags) -->
<!-- The og:image is what shows in Telegram link previews — no extra tags needed -->

<!-- PWA / Mobile -->
<meta name="theme-color" content="#2481cc">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Anti-Budget">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- Canonical -->
<link rel="canonical" href="https://lvpjsdev.github.io/anti-budget/">
```

### OG Image Generator Script

Run once during build to produce the static `og-image.png`:

```typescript
// scripts/generate-og-image.ts
// Run with: npx tsx scripts/generate-og-image.ts
// Requires: npm install -D tsx canvas
// Output: public/og-image.png

import { createCanvas } from 'canvas'; // Node.js canvas package
import * as fs from 'fs';

const W = 1200;
const H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background gradient
const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, '#1a1a2e');
grad.addColorStop(1, '#0f3460');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

// App name
ctx.font = 'bold 64px Arial';
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'center';
ctx.fillText('Anti-Budget', W / 2, 180);

// Tagline
ctx.font = '36px Arial';
ctx.fillStyle = 'rgba(255,255,255,0.65)';
ctx.fillText('Track one bad habit.', W / 2, 270);
ctx.fillText('Confront the annual number.', W / 2, 320);

// Example number
ctx.font = 'bold 120px Arial';
ctx.fillStyle = '#ffffff';
ctx.fillText('$1,524', W / 2, 480);

// Equivalent
ctx.font = '40px Arial';
ctx.fillStyle = 'rgba(255,255,255,0.80)';
ctx.fillText('= ✈️ a flight to Tokyo', W / 2, 555);

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/og-image.png', buffer);
console.log('✓ Generated public/og-image.png');
```

> **Install for script:** `npm install -D canvas tsx` (only for the script, not production)

**Alternative (no scripts):** Use Figma, Canva, or Sketch to create the image manually and export as `public/og-image.png`. Much simpler for a one-time thing.

### Meta Description Copy Options

Pick one (test both with split traffic later):

**Option A (curiosity):**
> "Track just one spending habit — coffee, delivery, cigarettes. See the annual total. Die a little inside. No bank links, no subscription, works offline."

**Option B (direct/sharp):**
> "You spent $1,524 on coffee this year. That's a flight to Tokyo. Anti-Budget tracks your one bad habit and shows you the number you've been avoiding."

**Option C (pain-focused):**
> "Stop budgeting everything. Track the one thing you know you shouldn't be spending on. Anti-Budget shows you the annual total and what you could have bought instead."

### robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://lvpjsdev.github.io/anti-budget/sitemap.xml
```

### Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lvpjsdev.github.io/anti-budget/</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Link Preview Testing Tools

Before shipping, verify the OG image looks right everywhere:
1. **opengraph.xyz** — paste your URL, see all platform previews at once
2. **Telegram**: send the link to yourself in Saved Messages — Telegram will fetch the preview
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Common OG Image Issues

- Image not found: verify the `https://` URL is correct and publicly accessible after deploy
- Wrong image shown: old cache. Test in incognito or clear cache with `?v=2` query param
- Image too small: minimum 200×200px for Telegram; recommended 1200×630px
- Image blocked: ensure image is served with correct MIME type (`image/png`)

### Manifest.json Update

```json
{
  "name": "Anti-Budget",
  "short_name": "Anti-Budget",
  "description": "Track one bad spending habit. See the annual total. Die inside. No bank links, no subscription.",
  ...
}
```

The `description` field in the manifest is used by some app store-like PWA discovery surfaces.
