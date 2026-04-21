# Task 001: Vite + React + TypeScript Setup

**Epic:** epic-001-project-scaffold  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Code — Dev environment setup

---

## Goal

Initialize the anti-budget project with Vite + React + TypeScript, configure Tailwind CSS with Telegram theme variables, set up GitHub repository, and configure GitHub Actions for automatic deployment to GitHub Pages on every push to `main`.

---

## Acceptance Criteria

- [ ] `npm create vite@latest anti-budget -- --template react-ts` completed successfully
- [ ] All listed dependencies installed (`@twa-dev/sdk`, `idb`, `tailwindcss`, `date-fns`, `react-router-dom`)
- [ ] `npm run dev` starts dev server at `localhost:5173` with no errors
- [ ] `npm run build` produces a valid `dist/` folder
- [ ] `tailwind.config.ts` created and working (utility classes render in browser)
- [ ] Telegram theme CSS variables defined in `src/index.css`
- [ ] GitHub repo `lvpjsdev/anti-budget` created and code pushed
- [ ] GitHub Actions workflow `.github/workflows/deploy.yml` exists
- [ ] After pushing to `main`, GitHub Pages at `lvpjsdev.github.io/anti-budget` shows the app within 5 minutes
- [ ] `vite.config.ts` has `base: '/anti-budget/'` set for GitHub Pages path
- [ ] TypeScript compiles with 0 errors (`npx tsc --noEmit`)

---

## Estimated Effort

**3 hours**
- 30 min: Project init + dependency install
- 30 min: Tailwind + CSS variables setup
- 30 min: GitHub repo + push
- 45 min: GitHub Actions workflow + Pages config
- 45 min: Verify deployment works end-to-end

---

## Dependencies

None. First task in the project.

---

## Notes / Implementation Hints

### Step 1: Project Init

```bash
npm create vite@latest anti-budget -- --template react-ts
cd anti-budget
npm install
npm install @twa-dev/sdk idb date-fns react-router-dom
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom vitest @vitejs/plugin-react
npx tailwindcss init -p
```

### Step 2: Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tg: {
          bg: 'var(--tg-bg)',
          text: 'var(--tg-text)',
          hint: 'var(--tg-hint)',
          button: 'var(--tg-button)',
          'button-text': 'var(--tg-button-text)',
          'secondary-bg': 'var(--tg-secondary-bg)',
          link: 'var(--tg-link)',
          destructive: 'var(--tg-destructive)',
        },
      },
    },
  },
} satisfies Config
```

### Step 3: Telegram Theme Variables in index.css

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --tg-bg: var(--tg-theme-bg-color, #ffffff);
  --tg-text: var(--tg-theme-text-color, #000000);
  --tg-hint: var(--tg-theme-hint-color, #999999);
  --tg-button: var(--tg-theme-button-color, #2481cc);
  --tg-button-text: var(--tg-theme-button-text-color, #ffffff);
  --tg-secondary-bg: var(--tg-theme-secondary-bg-color, #f1f1f1);
  --tg-link: var(--tg-theme-link-color, #2481cc);
  --tg-destructive: var(--tg-theme-destructive-text-color, #ff3b30);
}

body {
  background-color: var(--tg-bg);
  color: var(--tg-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  overscroll-behavior: none; /* prevents bounce scroll in TMA */
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent; /* remove tap flash on mobile */
}
```

### Step 4: vite.config.ts — IMPORTANT for GitHub Pages

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/anti-budget/', // MUST match GitHub repo name for Pages to work
})
```

### Step 5: GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

**Also enable Pages in GitHub:**
Settings → Pages → Source: GitHub Actions

### Step 6: index.html title + meta tags

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/anti-budget/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#2481cc" />
  <title>Anti-Budget</title>
  <!-- Telegram Mini App script — loads in TMA context -->
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
```

> ⚠️ The Telegram script must be in `index.html`, not loaded dynamically. It initializes `window.Telegram` before your React code runs.

### Verify: Does Tailwind Work?

Add a test class to `App.tsx` and check the browser:
```tsx
<div className="bg-tg-button text-tg-button-text p-4 rounded-xl">
  Tailwind + Telegram theme works ✓
</div>
```
