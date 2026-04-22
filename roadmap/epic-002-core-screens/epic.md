# Epic 002: Core Screens

**Phase:** 1 — MVP Build (Week 1–2)  
**Status:** 🔲 TODO  
**Owner:** Solo dev + Kilo CLI  
**Estimated Duration:** 4–5 days  
**Prerequisite:** epic-001 complete

---

## Goal

Build the four essential UI screens that form the complete shame loop: onboarding (pick your one habit) → logger (< 5 sec entry) → shame stats (the number that makes you cry) → history (everything you logged).

---

## The Core Loop (Never Break This)

```
Open app
  ↓
[First time] Pick ONE habit
  ↓
See current month total PROMINENTLY
  ↓
See annual projection: "$1,524/year = ✈️ flight to Tokyo"
  ↓
[Optional] Log a new expense (< 5 seconds)
  ↓
Number updates. Shame refreshes. User closes.
  ↓
Tomorrow: repeat.
```

Every screen design decision must serve this loop. If it adds friction, it's wrong.

---

## Tasks

| Task | Description | Effort |
|------|-------------|--------|
| [task-001-onboarding-screen.md](./task-001-onboarding-screen.md) | Category picker, ONE selection, preset + custom | 4h |
| [task-002-logger-screen.md](./task-002-logger-screen.md) | Amount entry < 5 seconds, optional note, immediate feedback | 6h |
| [task-003-shame-stats-screen.md](./task-003-shame-stats-screen.md) | Monthly total + annual projection + "= X equivalent" | 6h |
| [task-004-history-screen.md](./task-004-history-screen.md) | Chronological list + swipe/long-press delete | 4h |

**Total estimated effort:** 20 hours

---

## Exit Criteria

- [ ] User can complete full journey: onboarding → log → see shame stats
- [ ] Log screen opens in < 1 second (no perceptible lag)
- [ ] Amount entry to confirmation takes < 5 seconds
- [ ] Shame stats number updates immediately after logging
- [ ] History shows all logged transactions, newest first
- [ ] Delete works (with confirmation) in history
- [ ] All screens work on real mobile viewport (375px width minimum)
- [ ] Dark mode looks correct (Telegram dark theme)

---

## Design Principles

1. **Big numbers first.** Stats screen = one huge number above the fold.
2. **Minimal chrome.** No headers with lots of icons. Let the content breathe.
3. **Touch-friendly targets.** Min 44px tap height for all interactive elements.
4. **Native feel.** Use Telegram theme colors everywhere. Don't look like a web page.
5. **Instant feedback.** Haptic + visual response on every tap.
