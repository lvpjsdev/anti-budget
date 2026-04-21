# Task 004: PWA — Manifest + Service Worker + Install Prompt

**Epic:** epic-003-telegram-integration  
**Status:** 🔲 TODO  
**Estimated Effort:** 5 hours  
**Type:** Code — PWA

---

## Goal

Make the app installable as a Progressive Web App on Android and iOS: create a proper Web App Manifest, implement a cache-first Service Worker for full offline support, and show a custom "Add to Home Screen" install prompt when the browser criteria are met.

---

## Acceptance Criteria

- [ ] `public/manifest.json` exists with correct `name`, `short_name`, `icons`, `theme_color`, `display: standalone`, `start_url`
- [ ] Icons generated at 192×192 and 512×512 (PNG, maskable variant)
- [ ] `<link rel="manifest">` in `index.html`
- [ ] Service Worker registered in `main.tsx` on app load
- [ ] Service Worker caches app shell (HTML, CSS, JS) on install
- [ ] App loads and functions in airplane mode after first visit (no network errors)
- [ ] New expenses can be logged while offline; they save to IndexedDB
- [ ] Custom install banner appears for eligible users (browser fires `beforeinstallprompt`)
- [ ] Install banner has "Install" and "Later" buttons
- [ ] After clicking "Install": browser native install prompt shows
- [ ] Lighthouse audit produces PWA score ≥ 90
- [ ] App does NOT prompt to install when already running as installed PWA

---

## Estimated Effort

**5 hours**
- 45 min: Manifest + icons
- 1.5h: Service Worker (cache strategy)
- 1h: SW registration + update handling
- 1h: Install prompt UI
- 45 min: iOS meta tags + testing

---

## Dependencies

- [epic-001/task-001](../epic-001-project-scaffold/task-001-vite-react-setup.md) — Vite config

---

## Notes / Implementation Hints

### Web App Manifest

```json
// public/manifest.json
{
  "name": "Anti-Budget",
  "short_name": "Anti-Budget",
  "description": "Track one bad spending habit. Confront the annual number.",
  "start_url": "/anti-budget/?utm_source=pwa_homescreen",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#2481cc",
  "lang": "en",
  "categories": ["finance", "productivity"],
  "icons": [
    {
      "src": "/anti-budget/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/anti-budget/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/anti-budget/icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

**Quick icon generation (no design needed):**
```bash
# Use a simple emoji as base icon
# Option A: Use https://icon.kitchen — free, generates all sizes
# Option B: Create a 512x512 PNG with the 💸 emoji on a colored background

# Using ImageMagick (if available):
convert -size 512x512 xc:'#2481cc' \
  -font "Apple Color Emoji" -pointsize 300 \
  -gravity center -fill white -annotate 0 '💸' \
  public/icons/icon-512.png

# Then generate 192x192:
convert public/icons/icon-512.png -resize 192x192 public/icons/icon-192.png
```

### Service Worker Strategy

Use Vite PWA plugin for zero-config service worker:

```bash
npm install -D vite-plugin-pwa
```

```typescript
// vite.config.ts — update
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: false, // We manage manifest.json manually in public/
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Cache-first for app shell
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/lvpjsdev\.github\.io\/anti-budget\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-shell-v1',
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  base: '/anti-budget/',
});
```

> `vite-plugin-pwa` generates the service worker automatically from your workbox config. No manual `service-worker.js` needed.

### Manual Service Worker (if not using vite-plugin-pwa)

```javascript
// public/sw.js
const CACHE_NAME = 'anti-budget-v1';
const SHELL_URLS = [
  '/anti-budget/',
  '/anti-budget/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/anti-budget/index.html').then(r => r || fetch(event.request))
    );
  }
});
```

```typescript
// src/main.tsx — register SW
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/anti-budget/sw.js').catch(console.error);
}
```

### Install Prompt Component

```typescript
// src/hooks/useInstallPrompt.ts
import { useState, useEffect } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function useInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function install() {
    if (!prompt) return;
    await prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') {
      setIsInstalled(true);
      setPrompt(null);
    }
  }

  function dismiss() {
    setPrompt(null);
    // Optionally save to localStorage to not show again for a while
    localStorage.setItem('install-dismissed', String(Date.now()));
  }

  return { showPrompt: prompt !== null && !isInstalled, install, dismiss };
}
```

```typescript
// src/components/InstallBanner.tsx
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export function InstallBanner() {
  const { showPrompt, install, dismiss } = useInstallPrompt();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-tg-button text-tg-button-text 
                    rounded-2xl p-4 shadow-lg z-40 flex items-center justify-between">
      <div>
        <p className="font-semibold text-sm">Install Anti-Budget</p>
        <p className="text-xs opacity-80">Works offline, no app store needed</p>
      </div>
      <div className="flex gap-2">
        <button onClick={dismiss} className="text-xs opacity-70 px-2 py-1">
          Later
        </button>
        <button
          onClick={install}
          className="bg-white text-tg-button text-xs font-semibold px-3 py-1.5 rounded-lg"
        >
          Install
        </button>
      </div>
    </div>
  );
}
```

Add `<InstallBanner />` to `Layout.tsx`.

### iOS Specific: Safari "Add to Home Screen"

iOS Safari doesn't support `beforeinstallprompt`. Users must manually add via Share → Add to Home Screen.

Show a hint on iOS:
```typescript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isInBrowser = !window.matchMedia('(display-mode: standalone)').matches;

if (isIOS && isInBrowser) {
  // Show manual instruction banner after 30 seconds
}
```

### Index.html — iOS Meta Tags

```html
<!-- index.html — add to <head> -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Anti-Budget">
<link rel="apple-touch-icon" href="/anti-budget/icons/icon-192.png">
```

### Testing Offline Mode

1. Open Chrome DevTools → Network tab → set to "Offline"
2. Refresh the page — should still load from cache
3. Navigate to Log screen → enter amount → tap Add
4. Go to History — transaction should appear
5. Re-enable network — data should still be there (it's in IndexedDB, not network-dependent)
