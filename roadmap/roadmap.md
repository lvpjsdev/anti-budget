# Anti-Budget App — Product Roadmap

> Track one bad spending habit. Confront the annual number. Die inside.

**Stack:** React 18 + Vite + TypeScript + `@twa-dev/sdk` + IndexedDB + Service Worker  
**Platforms:** Telegram Mini App (primary) + PWA (secondary)  
**Monetization:** Free + $4.99 one-time unlock + Telegram Stars  
**Distribution:** Telegram channels + Reddit + in-app share mechanic  
**Solo dev + KiloClaw AI assistant**

---

## North Star Metric

**Day-7 Retention ≥ 40%** — percentage of users who log at least one expense in their first 7 days after onboarding.

---

## Phase Overview

| Phase | Duration | Goal | Exit Criteria |
|-------|----------|------|---------------|
| **Phase 0: Validation** | 48 hours | Prove demand before writing code | ≥ 4/5 green signals |
| **Phase 1: MVP Build** | Week 1–3 | Working app, core loop, paywall | 10+ beta users logged ≥1 tx |
| **Phase 2: Launch & Growth** | Week 4–8 | Organic users + first revenue | 200+ users, ≥3% paywall conversion |
| **Phase 3: PMF & Iterate** | Month 2–3 | Retention signal + sustainability | D7 ≥40%, revenue ≥$500 cumulative |

---

## Phase 0: Validation (48 Hours)

**Goal:** Prove people will click, sign up, and express pain publicly before writing a single line of product code.

**Epics:**
- [epic-000-validation](./epic-000-validation/epic.md) — 48h smoke test

**Key Deliverables:**
- Landing page live (Carrd)
- Reddit post posted
- Decision made: Build / Adjust / Pivot

**Green Light Criteria (4/5 must be green):**

| Signal | 🔴 Red (Kill) | 🟡 Yellow | 🟢 Green (Build) |
|--------|--------------|-----------|-----------------|
| Landing conversion | < 5% | 5–9% | ≥ 10% |
| Email signups | < 10 | 10–49 | ≥ 50 |
| Reddit upvotes | < 50 | 50–99 | ≥ 100 |
| Reddit pain comments | < 10 | 10–29 | ≥ 30 |
| "Want this app" DMs/comments | 0 | 1–4 | ≥ 5 |

---

## Phase 1: MVP Build (Weeks 1–3)

**Goal:** Functional app with core shame loop, Telegram integration, paywall, and PWA support.

**Epics:**
- [epic-001-project-scaffold](./epic-001-project-scaffold/epic.md) — Dev environment, repo, CI/CD, data layer
- [epic-002-core-screens](./epic-002-core-screens/epic.md) — Onboarding, Logger, Shame Stats, History
- [epic-003-telegram-integration](./epic-003-telegram-integration/epic.md) — TMA SDK, haptics, Stars paywall, PWA
- [epic-004-share-mechanic](./epic-004-share-mechanic/epic.md) — Shame card, native share sheet

**Week 1 Focus:** Core loop working locally (onboarding → log → shame stats)  
**Week 2 Focus:** Telegram SDK + Stars paywall + PWA  
**Week 3 Focus:** Share mechanic + polish + soft launch to waitlist

**End of Phase 1 Definition of Done:**
- [ ] Full user journey works: pick category → log → see shame stats
- [ ] Works inside Telegram Mini App iframe on real Android/iOS
- [ ] PWA installable, works fully offline
- [ ] Telegram Stars payment works (test mode)
- [ ] Share card generates and can be sent in Telegram
- [ ] 10+ beta users have used the app

---

## Phase 2: Launch & Growth (Weeks 4–8)

**Goal:** Hit 200+ organic users. Enable paywall. Get first purchases.

**Epics:**
- [epic-005-launch](./epic-005-launch/epic.md) — Channel seeding, Reddit content, PWA meta/ASO

**Key Activities:**
- Week 4: Telegram channel outreach (5–10 channels)
- Week 4: Enable paywall for annual projection feature
- Week 5: First Reddit story post
- Week 6: Product Hunt submission (if 50+ active users)
- Week 6–8: A/B price point ($4.99 vs $6.99)

**Exit Criteria:**
- [ ] ≥ 200 organic users
- [ ] Paywall conversion ≥ 3%
- [ ] Share mechanic used organically (≥ 10 shares)
- [ ] D7 retention ≥ 25% (first cohort)

---

## Phase 3: PMF & Iterate (Month 2–3)

**Goal:** Confirm product-market fit or pivot decisively.

**Key Activities:**
- Weekly metrics reviews (template in FOUNDER-OS-PLAN.md)
- Fix onboarding based on drop-off data
- Evaluate D7 retention cohorts
- Assess pivot triggers if needed

**PMF Green Light:**
- D7 retention ≥ 40%
- Revenue ≥ $500 cumulative
- Organic growth (new users from share mechanic > paid/seeded users)

**Kill Criteria:**
- Revenue < $50 cumulative by Month 3
- D30 retention < 10%
- Growth flat or declining after distribution push

---

## Architecture Reference

```
Platform:    Telegram Mini App (primary) + PWA (secondary)
Stack:       React 18 + Vite + TypeScript
TG SDK:      @twa-dev/sdk
Storage:     IndexedDB (via idb library)
Styling:     Tailwind CSS + Telegram theme variables (--tg-theme-*)
Deployment:  GitHub Pages → lvpjsdev.github.io/anti-budget
Paywall:     Telegram Stars (TMA) + one-time code (PWA via Gumroad/LemonSqueezy)
CI:          GitHub Actions → auto-deploy on push to main
Analytics:   Umami (self-hosted, free)
```

---

## Epic Index

| Epic | Phase | Status | Description |
|------|-------|--------|-------------|
| [epic-000-validation](./epic-000-validation/epic.md) | 0 | 🔲 TODO | 48h smoke test |
| [epic-001-project-scaffold](./epic-001-project-scaffold/epic.md) | 1 | 🔲 TODO | Dev setup, repo, data layer |
| [epic-002-core-screens](./epic-002-core-screens/epic.md) | 1 | 🔲 TODO | Onboarding, Logger, Stats, History |
| [epic-003-telegram-integration](./epic-003-telegram-integration/epic.md) | 1 | 🔲 TODO | TMA SDK, haptics, Stars, PWA |
| [epic-004-share-mechanic](./epic-004-share-mechanic/epic.md) | 1 | 🔲 TODO | Shame card + share sheet |
| [epic-005-launch](./epic-005-launch/epic.md) | 2 | 🔲 TODO | Telegram channels, Reddit, ASO |

---

*Last updated: 2026-04-21*
