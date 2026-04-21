# Epic 003: Telegram Integration

**Phase:** 1 — MVP Build (Week 2)  
**Status:** 🔲 TODO  
**Owner:** Solo dev + Kilo CLI  
**Estimated Duration:** 3–4 days  
**Prerequisite:** epic-002 complete (core screens working)

---

## Goal

Make the app feel completely native inside Telegram: use Telegram's MainButton for primary actions, add haptics throughout, implement the Telegram Stars paywall, and ship the PWA with offline support.

---

## Tasks

| Task | Description | Effort |
|------|-------------|--------|
| [task-001-telegram-mainbutton.md](./task-001-telegram-mainbutton.md) | Wire MainButton to Log action throughout the app | 3h |
| [task-002-telegram-haptics.md](./task-002-telegram-haptics.md) | Add haptic feedback to all key interactions | 2h |
| [task-003-telegram-stars-paywall.md](./task-003-telegram-stars-paywall.md) | Implement Stars payment flow + PWA unlock code flow | 6h |
| [task-004-pwa-service-worker.md](./task-004-pwa-service-worker.md) | PWA manifest, service worker, install prompt | 5h |

**Total estimated effort:** 16 hours

---

## Exit Criteria

- [ ] Telegram MainButton shows "Add $X" when amount > 0 on Logger screen
- [ ] Haptics fire on: keypad taps, successful log, delete confirmation
- [ ] Stars payment can be triggered and completes in test mode
- [ ] After Stars payment: `Settings.unlocked = true` persisted in IndexedDB
- [ ] PWA installable on Android Chrome: "Add to Home Screen" works
- [ ] PWA works fully in airplane mode (all screens load, data persists, new entries save)
- [ ] Lighthouse PWA score ≥ 90

---

## Notes

The paywall is the most complex task in this epic. The Stars invoice requires a small backend — the recommended approach is a Cloudflare Worker (free tier, < 20 lines of code) that creates the invoice and returns the link to the client.

The PWA unlock is simpler: generate a one-time code on purchase (via Gumroad webhook → email) and validate it client-side.
