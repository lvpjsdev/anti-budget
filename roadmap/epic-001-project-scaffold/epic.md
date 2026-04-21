# Epic 001: Project Scaffold

**Phase:** 1 — MVP Build (Week 1)  
**Status:** 🔲 TODO  
**Owner:** Solo dev + Kilo CLI  
**Estimated Duration:** 2–3 days  
**Prerequisite:** Phase 0 green light received

---

## Goal

Establish a fully working development foundation: repo, Vite/React/TypeScript project, IndexedDB data layer, Telegram SDK wired up, client-side routing — so Week 1 dev can focus entirely on UI screens.

---

## Tasks

| Task | Description | Effort |
|------|-------------|--------|
| [task-001-vite-react-setup.md](./task-001-vite-react-setup.md) | Init Vite + React + TS, Tailwind, GitHub Actions CI/CD | 3h |
| [task-002-indexeddb-schema.md](./task-002-indexeddb-schema.md) | Define IndexedDB schema, create typed idb wrapper | 4h |
| [task-003-twa-sdk-setup.md](./task-003-twa-sdk-setup.md) | Wire @twa-dev/sdk, Telegram theme vars, dark/light mode | 2h |
| [task-004-routing.md](./task-004-routing.md) | Client-side routing with React Router, tab navigation shell | 3h |

**Total estimated effort:** 12 hours

---

## Exit Criteria

- [ ] `npm run dev` starts a working dev server
- [ ] App deploys automatically to GitHub Pages on push to `main`
- [ ] IndexedDB CRUD works (manual test: add a record, reload, record persists)
- [ ] `@twa-dev/sdk` initializes without errors in Telegram Mini App iframe
- [ ] Telegram theme colors applied (app looks native in Telegram)
- [ ] Bottom tab navigation renders with 3 placeholder screens
- [ ] TypeScript compiles with 0 errors

---

## Architecture Notes

```
src/
  db/
    schema.ts          # TypeScript interfaces
    index.ts           # idb wrapper with all CRUD functions
  hooks/
    useDb.ts           # React hook wrapping db operations
    useTelegram.ts     # Hook for WebApp instance + theme
  components/
    TabBar.tsx         # Bottom navigation
    Layout.tsx         # App shell
  screens/
    OnboardingScreen.tsx
    LogScreen.tsx
    StatsScreen.tsx
    HistoryScreen.tsx
  App.tsx
  main.tsx
```

**Key Dependencies:**
```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@twa-dev/sdk": "latest",
    "idb": "^8",
    "date-fns": "^3",
    "react-router-dom": "^6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "typescript": "^5",
    "tailwindcss": "^3",
    "autoprefixer": "latest",
    "vitest": "latest"
  }
}
```
