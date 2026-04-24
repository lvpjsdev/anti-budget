# LOG

## 2026-04-24 — Weekly Summary (Week ending April 24)

### ✅ Completed this week
- Research phase complete: 3 parallel agents (market, users, tech)
- Product strategy finalized: Telegram Mini App + PWA, one-time purchase
- Landing page live: https://antibudget.carrd.co/
- Epic-001 (scaffold) delivered: Vite + React + TS + TMA + IndexedDB + routing
- Epic-002 (core screens) delivered: Onboarding, Logger, ShameStats, History
- Epic-003 (Telegram integration) delivered: Stars paywall, PWA, haptics, service worker
- Epic-004 (share mechanic) delivered: Shame card canvas + native Telegram sharing
- Documentation: README.md, TELEGRAM.md complete
- Build passing (331KB JS, 12KB CSS)
- 12 local commits ready on main branch
- Opportunity Scout report: Anti-Budget 9.2/10 (validated)

### 📊 Key metrics
- Build size: 331KB JS / 12KB CSS
- Local commits pending push: 12
- Research signals: Positive (Reddit engagement, viral spending stories found)

### 🔧 Blockers
- GitHub PAT invalid (both tokens dead) → code cannot be pushed, deployment blocked
- Reddit account too fresh → post delayed 1–2 days
- Telegram bot not yet created (@BotFather pending)

### 📅 Plan for next week (April 27 – May 3)
1. Fix GitHub token → push all local commits → trigger CI/CD deploy
2. Create Telegram bot via @BotFather
3. Deploy live to GitHub Pages
4. Launch Reddit post (r/NoSpend or r/frugal)
5. Outreach to 5–10 Telegram channels (budgeting / per-diem communities)
6. Enable paywall (Stars + PWA Gumroad)
7. Onboard first 10 beta users from waitlist
8. Set up analytics (Umami or simple page view counter)

### 🚨 Decisions needed from founder
- Reddit strategy: Wait for account to age (Apr 26–27) or use alternative fresh-account approach?
- Waitlist: 10 beta users threshold for soft launch — firm number or proceed when ready?
- Outreach message tone: shame-focused vs. helpful budgeting tool — which angle tests first?

---

## 2026-04-21

### 02:00–02:40 — Research phase
- Запустили 3 параллельных агента (market + users + tech)
- Market: найден конкурент PerDiem, Mint умер (10M пользователей без замены), Monee кейс (0→16K DAU без маркетинга)
- Users: Reddit подтвердил спрос, вирусные кейсы ($1089 Starbucks, $10952 DoorDash), shame механик работает
- Tech: стек определён (expo-sqlite/drizzle для нативного, но решили идти в веб)

### 02:40 — Стратегическое решение
Отказ от App Store в пользу Telegram Mini App + PWA.

### 02:41 — Структура проекта
- Создан GitHub репо: https://github.com/lvpjsdev/anti-budget-app
- Инициализирован long-project-manager workspace

### 00:55 — Лендинг финиширован
- English текст
- Confirmation message добавлен

### 00:40 — Carrd лендинг готов
- https://antibudget.carrd.co/
- Google Form для сбора email

### 00:15 — Reddit пост удалён
- Пост в r/personalfinance удалён (модераторы или новый аккаунт)
- Свежий аккаунт — нужно подождать 1-2 дня
- Пробуем завтра r/NoSpend или r/frugal

## 2026-04-21 — Daily Digest

**Tasks completed today:**
- ✅ task-001: Vite + React + TS + Tailwind + TMA SDK scaffold (PR #1 merged)
- ✅ task-002: IndexedDB data layer (PR #2 merged)

**Epic-001 progress:** 2/4 tasks done

**Next:** task-003 (Telegram SDK), task-004 (routing)

**No blockers.

## 2026-04-22 — Massive Progress (Night Sesh)

**Completed today:**
- ✅ Epic-001 (project scaffold): All 4 tasks done locally
- ✅ Epic-002 (core screens): Onboarding, Logger, ShameStats, History
- ✅ Epic-003 (Telegram SDK + Stars paywall + PWA): Service Worker, haptics, offline
- ✅ Epic-004 (share mechanic): Shame card canvas + Telegram sharing
- ✅ Fix: TypeScript type conflicts across all files

**Local commits (not pushed - GitHub token issue):**
- 9917a7e fix: consolidate Telegram types
- c2ec9a2 feat(share): viral shame card sharing mechanic
- 9124c47 feat(monetization): Telegram Stars paywall + PWA manifest
- 48c8930 feat(screens): core screens (onboarding, logger, stats, history)
- 5219538 feat(ui): Telegram SDK + TabBar + Layout

**GitHub token status:** 403 Permission denied. Waiting for user fix.

**Build:** ✅ Passing (331KB JS, 12KB CSS)

## 2026-04-22 06:43 AM — Status Update

**All coding epics complete! (001-004)**
- ✅ Epic-001: Project scaffold (scaffold, IndexedDB, TMA SDK, routing)
- ✅ Epic-002: Core screens (Onboarding, Logger, Stats, History)
- ✅ Epic-003: Telegram integration (Stars paywall, PWA, haptics)
- ✅ Epic-004: Share mechanic (shame card canvas + Telegram sharing)

**Documentation:**
- ✅ README.md: complete project docs
- ✅ TELEGRAM.md: bot setup guide
- ✅ src/lib/telegram.ts: Telegram helper functions

**Build:** ✅ 331KB JS

**GitHub push:** ❌ 403 token issue - blocked

**Next actions (user only):**
1. Fix GitHub token → push commits
2. Create Telegram bot via @BotFather
3. Post on Reddit (reddit-post.md ready)
4. Deploy to GitHub Pages (CI/CD auto-configured)

**Autonomous tasks remaining:**
- Epic-005 launch prep (Telegram channel list, outreach messages)

## 2026-04-24 — Market Intelligence Summary

### Search scope (last 24h)
- Reddit: budget app complaints, spending tracker requests, viral "I spent" stories
- Web: PerDiem app mentions, competitor news (YNAB/Copilot/Mint alternatives)

### Budget app complaints found
- **YNAB**: "WAY too involved," takes 30min-1hr every few weeks, learning curve too steep
- **Monarch**: Categories/labels reverting/changing without user action
- **EveryDollar**: Duplicate transactions persisting for months, requires connection to work
- **Best Budget**: "Too many adds," now feels like "an advert app instead of a budget app"
- **Actual Budget**: Cache reset bug breaking budgets (GitHub #6605)
- Common theme: Users resent subscription creep — YNAB now $109/yr, Copilot $95/yr

### 🚨 Viral spending stories (high engagement)
- "Burning £1,000/month on food/groceries" (UK, early 20s, lives alone)
- "I make six figures and barely float each month" — $1500/mo food & dining, $1000 travel
- Uber Eats "saved $2700?" expose: subscription inflates prices then "discounts" them back
- Venmo split problem: apps treat reimbursements as income, blowing budget visibility
- Seattle coffee shock: lattes nearing $9, locals giving up even occasional treats

### Spending tracker requests
- "App where you can upload bank info to see where to cut back?" — AI-powered suggestions wanted
- "Day-by-day" budget view requested repeatedly, not monthly breakdowns
- Manual + auto import combo: users want to categorize properly without full bank sync
- "Just tell me what I have left to spend TODAY" — recurring theme across threads

### Competitor landscape
- **YNAB vs Copilot vs Monarch** comparison articles dominate (4 major guides published April 2026)
- Review consensus: YNAB for behavior change, Copilot for Apple design, Monarch for couples
- **WalletHub** emerging as free alternative with credit score monitoring
- Mint replacements settling: Monarch most-recommended but YNAB retention highest

### 🚨 PerDiem app status
- **Zero mentions** in budgeting/finance context — only "per diem" job payment references
- Opportunity opening: if user demand exists for per-diem style daily budgeting, field is clear

### 🚨 Key user pain quotes to feature
1. "I just want a simple expense tracker. Not an app that would upsell me on investment advice"
2. "The free version is not a free version, it's a TRIAL VERSION"
3. "I spent so much time in the fucking app and barely understood it"
4. Apps "mine your data and sell it" — privacy concern spike

### Opportunity validation for anti-budget
- Daily pacing logic (TrackMySpend.org vibecoded) gaining traction
- Manual-first + AI categorization hybrid demand increasing
- "Subscription tracker" feature requested repeatedly (Rocket Money differentiator)
- Anti-shame marketing angle: posts about embarrassment get highest upvote ratios

---

## 2026-04-22 07:45 AM — Session Final Status

**GitHub push:** ❌ BLOCKED — both tokens invalid
- Token 1 (`github_pat_...`): BAD CREDENTIALS — revoked
- Token 2 (`ghp_...`): READ-ONLY — no write permissions
- **ACTION NEEDED**: User must create new PAT

**Anti-budget status:** ✅ Feature-complete
- 12 local commits on main (not pushed)
- All coding epics done (001-004)
- Documentation complete
- Build passing (331KB)
- Ready for launch

**Opportunity Scout report created:**
- Anti-Budget: 9.2/10 (validated)
- Pet Med Tracker: 8.5/10 (validated)
- Offline Budget RU: 8.0/10 (CIS market)

**User action required to proceed:**
1. New GitHub PAT (repo scope) → then push + deploy
2. Telegram bot via @BotFather → then configure
3. Reddit post → then launch
