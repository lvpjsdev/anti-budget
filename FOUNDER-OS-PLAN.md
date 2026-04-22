# FOUNDER-OS PLAN — Anti-Budget App
> Generated: 2026-04-21 | Framework: Founder OS Phase 1–3
> Solo founder + KiloClaw | GitHub: lvpjsdev | $0 ongoing budget

---

## TL;DR Decision Tree

```
48h Smoke Test
    ├── 🟢 Green (conversion ≥10%, 30+ pain comments) → BUILD MVP immediately
    ├── 🟡 Yellow (partial signal) → Reframe positioning, re-test 24h, then build
    └── 🔴 Red (conversion <5%, <10 comments) → STOP. Pivot hypothesis first.

MVP Week 1-3
    ├── Week 1: Core loop (onboarding + logger + shame stats)
    ├── Week 2: Polish + Telegram Mini App integration + Stars paywall
    └── Week 3: PWA + soft launch to waitlist

Launch
    ├── Telegram channels → viral share mechanic → organic growth
    └── Reddit posts → SEO long-tail → PWA installs

PMF Gate (Day 30)
    ├── 🟢 W1 retention ≥40% + ≥5 organic conversions → Scale distribution
    ├── 🟡 Retention 25-39% → Fix onboarding UX, retry 2 weeks
    └── 🔴 Retention <25% after fix → Kill or pivot to different shame mechanic
```

---

## PHASE 1 — VALIDATION (48 Hours)

### Overview
You already have ~20 data points from Reddit/research agents. This is NOT zero. You're
confirming signal is real and measuring copy + positioning resonance — not discovering
the problem from scratch.

**Goal:** Prove people will click, sign up, and express pain publicly before you write a line of product code.

---

### Hour-by-Hour Checklist

#### ⏱ Hour 0–1: Set Up Smoke Test Assets (~45 min)

**Step 1: Landing Page (Carrd or GitHub Pages)**

Option A — Carrd (faster, zero-code):
- [ ] Go to carrd.co → free account → blank site
- [ ] Headline: **"Сколько ты потратил на кофе в этом году?"**
- [ ] Subheadline: **"Посчитай одну плохую привычку. Узнай годовую сумму. Умри внутри."**
- [ ] Hero visual: simple mockup or just big number "$1,524" with "= перелёт в Токио" below
- [ ] CTA button: **"Хочу знать правду →"** → leads to email signup (Carrd has built-in forms)
- [ ] Secondary line: "Без банков. Без подписок. Один трекер."
- [ ] Deploy: `yourname.carrd.co` or custom domain if available

Option B — GitHub Pages (more control):
- [ ] Create repo `lvpjsdev/anti-budget-landing`
- [ ] Single `index.html` with inline CSS + Tally.so or Formspree embed for email capture
- [ ] Deploy via GitHub Pages → `lvpjsdev.github.io/anti-budget-landing`
- [ ] Track with Umami (free, self-host) or Plausible (free tier) or just Tally's built-in count

**Step 2: UTM-tagged links**
Create 2–3 variants to know which channel converts:
- `?utm_source=reddit_personalfinance`
- `?utm_source=reddit_povertyfinance`
- `?utm_source=telegram`

---

#### ⏱ Hour 1–2: Post on Reddit

**Primary post — r/personalfinance** (2.1M members, English):

Title:
> **"I just realized I spent $1,089 on Starbucks this year and I want to cry"**

Body:
> Had a rough moment this week when I actually added up every Starbucks visit this year.
> $1,089. That's a flight to Japan. That's 2 months of groceries.
>
> The weird thing is every single purchase felt fine — it's just $5.50. But the annual
> number is what broke my brain.
>
> Does anyone else do this? Track just ONE spending habit obsessively to confront the
> annual reality? What do you use? I've tried YNAB but it's overkill, I just want to
> stare at my one stupid number.

Call to action: NO explicit product mention. Just genuine pain sharing. Let people ask.
If they ask "is there an app?" → reply "Building one actually, [link to landing]"

**Backup post — r/povertyfinance** (adapt tone, more struggling less "flight to Japan"):
> Title: **"Tracked every single coffee purchase for 6 months. The annual projection destroyed me."**

**Russian-language posts (Telegram channels)**:
- Find 2–3 Telegram channels about personal finance (search "личные финансы", "финансы", "экономия")
- Post: "Посчитал сколько трачу на кофе в год. Оказалось ₽47,000. Это отпуск в Турции. Мозг сломан."
- Add landing link or @mention with invite to waitlist

---

#### ⏱ Hour 2–48: Monitor and Respond

**Every 4 hours, check:**
- [ ] Landing page conversion rate (signups / visitors)
- [ ] Reddit post upvotes and comment quality
- [ ] Total email signups

**Engage with every comment:**
- Respond to every person who shares their own pain story
- Do NOT pitch the product unless asked directly
- If asked "is there an app" → drop the landing link naturally

---

### ✅ Success Criteria — 48 Hours

| Signal | 🔴 Red (Kill) | 🟡 Yellow (Adjust) | 🟢 Green (Build) |
|--------|--------------|-------------------|-----------------|
| Landing conversion | < 5% | 5–9% | ≥ 10% |
| Email signups | < 10 | 10–49 | ≥ 50 |
| Reddit upvotes | < 50 | 50–99 | ≥ 100 |
| Reddit pain comments | < 10 | 10–29 | ≥ 30 |
| "Want this app" comments | 0 | 1–4 | ≥ 5 |

**Scoring: count how many columns are Green.**
- 4–5 Green → Full speed ahead to MVP
- 2–3 Green → Adjust and retest 24h, then build
- 0–1 Green → Stop. Re-examine hypothesis before building.

---

### 🔴 Red Light Scenario — What To Do

If results are Red after 48 hours:

1. **Don't pivot immediately** — first check: was the copy bad, or is the problem wrong?
   - Did you get traffic but no signups? → Problem is real, landing copy is wrong. Rewrite headline, retest.
   - Did nobody engage at all? → Problem signal is weak. Move to pivot.

2. **Copy fix attempt (6 hours)**:
   - New headline: "Your coffee costs $127/month. That's $1,524/year. Here's the number you've been avoiding."
   - New CTA: "Show me my number"
   - Repost in different subreddit (r/frugal, r/NoSpend)

3. **If still Red after fix** → Pivot hypothesis:
   - Option A: Broaden to "any single impulse spend" (not just coffee)
   - Option B: Reframe as "spending shame journal" — lean into the emotional mechanic harder
   - Option C: Re-examine pet tracker idea as fallback

---

### 🟡 Yellow Light Scenario — Positioning Adjustment

If 2–3 metrics are Green:

1. Read comments carefully — what exact phrase did people resonate with?
2. If coffee frame doesn't land → try UberEats / delivery / cigarettes framing
3. Update landing headline to match the language people actually used
4. Post 1 more targeted post in a different community
5. Wait 24 more hours, then build regardless (Yellow is still signal enough)

---

### 🟢 Green Light Scenario — Build

If 4+ metrics are Green:

1. Screenshot/archive all comments with pain signals → save to `VALIDATION-RESULTS.md`
2. Note exact phrases people used (for copy/onboarding later)
3. Email list is your beta testers → send "we're building it" message within 48h
4. Start MVP immediately (Phase 2)

---

## PHASE 2 — MVP BUILD (Weeks 1–3)

### Architecture Decisions (locked)

```
Platform:    Telegram Mini App (primary) + PWA (secondary)
Stack:       React 18 + Vite + TypeScript
TG SDK:      @twa-dev/sdk
Storage:     IndexedDB (via idb library) — works in TMA + PWA
Styling:     Tailwind CSS + Telegram theme variables (--tg-theme-*)
Deployment:  GitHub Pages (free) or Vercel (free tier)
Paywall:     Telegram Stars (TMA) + manual unlock code (PWA)
CI:          GitHub Actions → auto-deploy on push to main
```

**Why IndexedDB over SQLite-wasm:**
SQLite-wasm requires SharedArrayBuffer → needs COOP/COEP headers → complicates Telegram Mini App iframe context. IndexedDB is native, zero-config, works everywhere. Switch to SQLite-wasm only if complex queries become necessary (they won't be in v1).

---

### Feature Scope — Iron Triangle

**IN v1 (non-negotiable core loop):**
1. Onboarding — pick ONE category (forced choice, max 1, can't add more)
2. Quick log — amount + optional note, < 5 seconds to complete
3. Shame Stats screen — this month total + annualized projection + "= X" equivalent
4. Transaction history — list + swipe-to-delete
5. Daily reminder — Telegram notification (TMA) or local notification (PWA)
6. Paywall — "Unlock lifetime stats" for $4.99 / Telegram Stars

**OUT of v1 (explicitly cut):**
- ❌ Charts and graphs (Week 2+ feature)
- ❌ Multiple categories
- ❌ Data export
- ❌ Cross-device sync
- ❌ Social sharing (add in v1.1 — huge viral potential but scope risk)
- ❌ Biometric lock
- ❌ Widgets
- ❌ Custom equivalents editor

---

### Week 1 — Core Loop

**Goal:** Functional app, runs locally, core user journey complete end-to-end.

**Day 1–2: Project scaffold**
- [ ] `npm create vite@latest anti-budget -- --template react-ts`
- [ ] Install deps: `@twa-dev/sdk`, `idb`, `tailwindcss`, `date-fns`
- [ ] Set up Telegram bot via @BotFather → get bot token
- [ ] Configure Mini App in BotFather: Menu Button → your dev URL
- [ ] Set up GitHub repo `lvpjsdev/anti-budget`
- [ ] Configure GitHub Actions: push to `main` → deploy to GitHub Pages
- [ ] Set up Telegram theme CSS variables in `index.css`

```css
/* Use Telegram's palette so the app feels native */
:root {
  --bg: var(--tg-theme-bg-color, #ffffff);
  --text: var(--tg-theme-text-color, #000000);
  --hint: var(--tg-theme-hint-color, #999999);
  --button: var(--tg-theme-button-color, #2481cc);
  --button-text: var(--tg-theme-button-text-color, #ffffff);
  --secondary-bg: var(--tg-theme-secondary-bg-color, #f1f1f1);
}
```

**Day 3–4: Data layer**
- [ ] Define schema in IndexedDB:
  ```typescript
  interface Category { id: string; name: string; emoji: string; createdAt: number }
  interface Transaction { id: string; amount: number; note?: string; timestamp: number }
  interface Settings { unlocked: boolean; reminderTime?: string; currency: string }
  ```
- [ ] Create `db.ts` with idb wrapper: `getCategory`, `addTransaction`, `getTransactions`, `getSettings`, `setUnlocked`
- [ ] Write unit tests for DB layer (optional but fast with Vitest)

**Day 5–7: UI screens**
- [ ] `OnboardingScreen` — category picker with 8 presets (coffee ☕, delivery 🍕, taxi 🚕, cigarettes 🚬, alcohol 🍺, gaming 🎮, shopping 🛍️, custom ✏️)
- [ ] `LogScreen` — number pad + optional note input + "Add" button (this is the primary daily action)
- [ ] `StatsScreen` — 3 numbers: this month, this year, projected annual. Below: "= {equivalent}"
  - Equivalents array: ["a flight to Tokyo", "2 months of groceries", "a weekend trip", "47 Subway sandwiches", ...]
  - Pick equivalent based on annual amount range
- [ ] `HistoryScreen` — flat list, newest first, swipe-to-delete (or long-press)
- [ ] Bottom tab nav: Log | Stats | History

**KiloClaw usage pattern for Week 1:**
```bash
# Use Kilo CLI for boilerplate and repetitive code
kilo run --auto "Create a React component OnboardingScreen with category picker grid, 
8 preset categories with emoji, one-select only, Telegram theme variables, 
TypeScript, Tailwind CSS"

kilo run --auto "Create idb wrapper for anti-budget app with schema: 
Category, Transaction, Settings. Functions: addTransaction, 
getTransactionsByMonth, getSettings, setUnlocked"
```

**End of Week 1 Definition of Done:**
- [ ] Can complete full user journey: pick category → log expense → see shame stats
- [ ] Works in Telegram Mini App iframe (test via BotFather Menu button)
- [ ] Data persists across page reloads
- [ ] No crashes on mobile viewport

---

### Week 2 — Telegram Integration + Paywall

**Goal:** Telegram-native experience + monetization working end-to-end.

**Day 8–9: Telegram SDK integration**
- [ ] Initialize `@twa-dev/sdk`:
  ```typescript
  import WebApp from '@twa-dev/sdk';
  WebApp.ready();
  WebApp.expand(); // full-screen
  ```
- [ ] Use `WebApp.MainButton` for primary CTA (Log button → feels native)
- [ ] Use `WebApp.BackButton` for navigation
- [ ] Use `WebApp.showConfirm()` for delete confirmation
- [ ] Use `WebApp.HapticFeedback` for log button tap
- [ ] Read `WebApp.initDataUnsafe.user` for Telegram user identity (display name in onboarding)
- [ ] Handle `WebApp.colorScheme` for dark/light mode

**Day 10–11: Paywall implementation**

Free tier includes:
- Unlimited logging
- Current month stats
- Last 30 transactions

Locked (requires unlock):
- Full history (all time)
- Annual projection
- "= X equivalent" feature
- Future: streaks, export

```typescript
// Paywall gate example
function StatsScreen() {
  const { unlocked } = useSettings();
  
  return (
    <div>
      <ThisMonthTotal /> {/* always free */}
      {unlocked ? <AnnualProjection /> : <PaywallTeaser />}
    </div>
  );
}

function PaywallTeaser() {
  return (
    <div className="paywall-blur">
      <div>You've spent ~$??? this year on [habit]</div>
      <button onClick={handleUnlock}>
        Unlock lifetime stats — $4.99 once
      </button>
    </div>
  );
}
```

**Telegram Stars payment:**
```typescript
async function handleUnlock() {
  // Stars: use Telegram's invoice API
  WebApp.openInvoice(invoiceLink, (status) => {
    if (status === 'paid') {
      db.setUnlocked(true);
      WebApp.showAlert('Unlocked! 🎉');
    }
  });
}
```

> **Note on Stars invoice:** You need a bot backend to create invoice links via Telegram Bot API. Options:
> - Minimal: Cloudflare Worker (free tier) that creates invoice → returns link → app calls it
> - Zero-backend: Generate a static invite link to a payment bot that handles it
> - Simplest: Use `WebApp.openLink` to a Telegram payment bot page

**Day 12–13: PWA setup**
- [ ] Create `manifest.json`: name, icons, theme_color, display: standalone
- [ ] Create `service-worker.js`: cache-first for shell, network-first for nothing (fully offline)
- [ ] Add install prompt: detect `beforeinstallprompt`, show custom "Add to homescreen" banner
- [ ] PWA unlock: generate a one-time code on purchase (Gumroad or LemonSqueezy webhook → email code)
  - User buys on web → gets code → enters code in app → stored in IndexedDB as `unlocked: true`
  - This is the MVP approach. Not elegant but zero-cost to implement.

**Day 14: Testing pass**
- [ ] Test on real Android Telegram (not Telegram Desktop — Mini Apps behave differently)
- [ ] Test on iOS Telegram
- [ ] Test PWA install flow on Android Chrome
- [ ] Test offline mode (airplane mode → log entry → reconnect → data intact)
- [ ] Test paywall: Stars payment flow in test mode

**End of Week 2 Definition of Done:**
- [ ] Telegram Stars payment works in test mode
- [ ] PWA installable, works offline
- [ ] App feels native in Telegram (uses MainButton, BackButton, haptics)
- [ ] Paywall properly gates annual projection feature

---

### Week 3 — Polish + Soft Launch

**Goal:** Shareable, delightful, ready for real users.

**Day 15–16: Onboarding polish**
- [ ] Add "shame moment" hook to onboarding:
  > "Every $5.50 coffee = $2,013/year. Pick your habit."
- [ ] Category selection: when user picks category, show live preview:
  > "If you spend $5/day on [coffee], that's **$1,825/year**"
- [ ] Micro-animation on stats screen (number counts up on load)
- [ ] Empty state for history: "No logs yet. Be brave. Log your first one."

**Day 17–18: Sharing mechanic (v1.1 scope, but high priority)**
The viral loop is critical for Telegram distribution:
- [ ] "Share my shame" button on Stats screen
- [ ] Generates a Telegram-native share card:
  > "I spent $847 on UberEats this year. 😭 That's a trip to Bali.
  > Track yours: t.me/YourBot"
- [ ] Use `WebApp.switchInlineQuery()` or `WebApp.openTelegramLink()` for share
- [ ] This single feature could be your biggest growth driver — prioritize it

**Day 19–20: Performance + edge cases**
- [ ] Handle currency: auto-detect from Telegram locale, allow manual change in Settings
- [ ] Handle very large numbers gracefully (₽1,000,000+ shouldn't break layout)
- [ ] Handle zero/empty state on Stats (first day of month)
- [ ] Add Settings screen: change category name, change currency, notification time
- [ ] Lighthouse audit: aim for 90+ performance score

**Day 21: Deployment + Beta**
- [ ] Tag v0.1.0 in GitHub
- [ ] Deploy to production URL (GitHub Pages: `lvpjsdev.github.io/anti-budget`)
- [ ] Configure BotFather with production URL
- [ ] Send to email waitlist: "It's ready. Here's your early access link."
- [ ] Send to 5 personal contacts for qualitative feedback

**End of Week 3 Definition of Done:**
- [ ] Share mechanic works on real Telegram
- [ ] 10+ beta users have logged at least 1 transaction
- [ ] No critical bugs in core loop
- [ ] Ready for public launch

---

## PHASE 3 — LAUNCH

### Distribution Strategy

The App Store is not your path. Your distribution is:
1. **Telegram channels** (primary virality)
2. **Reddit** (SEO + community trust)
3. **Share mechanic** (in-app virality)
4. **GitHub / Product Hunt** (developer audience → early adopters)

---

### Telegram Distribution

**Week 4 — Channel seeding:**

Find and post in relevant channels:
```
Search queries:
- "личные финансы" → Russian personal finance channels
- "экономия деньги" → savings/frugality
- "crypto finance" → English-speaking Telegram finance communities
- "expat finance" → international community
```

**Post template for Telegram channels:**
> Я посчитал сколько трачу на кофе в год. Оказалось ₽58,000.
> Это поездка в Таиланд. Мозг не справляется.
>
> Сделал трекер. Одна привычка. Одна цифра. Без банков и подписок.
> → t.me/YourBotName
>
> Попробуй. Потом расскажи во сколько тебе обходится твоя привычка.

**Why this works:** It's a personal story, not an ad. The number ($58k, $1,089) is the hook.
Expect 1–3% CTR, 20–40% of clickers to add bot.

**Your Bot = your distribution channel:**
Once users start the bot:
- [ ] Set up a welcome message: "What's your one spending habit?" → opens Mini App
- [ ] Optional: set up a channel `@anti_budget_shame` where users can post their annual numbers (social proof feed)

**The shame feed mechanic:**
Users can opt-in to post their number anonymously:
> "@anonymous spent $2,100 on Uber Eats this year 😭"

This channel becomes a growth engine. People share it. People join. Virality loop.

---

### Reddit Distribution (Week 4–6)

Post genuinely, not promotionally. One post per week, different subreddit.

| Week | Subreddit | Angle |
|------|-----------|-------|
| 4 | r/personalfinance | "I built an app after my Starbucks moment — here's what I learned" |
| 5 | r/povertyfinance | "Track the one habit bleeding your budget dry" |
| 6 | r/frugal | "Why I stopped tracking everything and track only one thing" |
| 7 | r/NoSpend | "Accountability tool for the one purchase you can't stop making" |

**Rule:** Lead with story, not with product. Product is the footnote. Comments are the point.

**SEO play:** Each Reddit post becomes a Google result for "track one spending habit app" type queries. Long-tail, free, compounds over time. PWA install page gets indexed.

---

### Product Hunt Launch (Week 6–8)

Submit when you have:
- [ ] 50+ real active users
- [ ] 3+ qualitative testimonials ("I found out I spend $800/year on...")
- [ ] Polished screenshots + demo GIF
- [ ] Clear tagline: "Track one bad spending habit. Confront the annual number."

Product Hunt is not your core channel — it's a credibility badge and a spike of English-speaking early adopters who will write about it elsewhere.

---

### Monetization Launch Sequence

**Week 4 (soft launch):** App is free, no paywall shown yet. Collect usage data.
**Week 5:** Enable paywall for annual projection feature.
**Week 6+:** A/B test price point if data supports it ($4.99 vs $6.99).

**Stars pricing:**
- 1 USD ≈ 50 Stars (approximate, Telegram adjusts)
- $4.99 ≈ 250 Stars
- Set your invoice to 250 Stars → feels like a small number but it's real money

**Conversion expectation:**
- Finance apps: 1–3% free → paid is normal
- With strong shame mechanic and "see your annual number" as the locked feature: 3–5% is achievable
- At 1,000 users, 1% = 10 purchases × $4.99 = $49.90
- At 10,000 users, 3% = 300 × $4.99 = $1,497
- Goal: reach $500 MRR equivalent in one-time purchases within 3 months (= PMF signal)

---

## PMF METRICS

### North Star Metric

**Day 7 Retention** — the percentage of users who log at least one expense in their first 7 days after onboarding.

> Why: If the annualized shock mechanic is working, users will come back. If they log once and leave, the core value proposition failed to hook them.

Target: ≥ 40% Day-7 retention = PMF signal.

---

### Measurement Dashboard (free stack)

| Tool | What it tracks | Cost |
|------|---------------|------|
| Umami (self-hosted on Vercel) | Page views, click events, custom events | $0 |
| Telegram Bot analytics | Bot starts, active users | Built-in |
| Google Sheets (manual) | Revenue, conversion rate, retention cohorts | $0 |
| Tally.so | NPS surveys to email list | Free tier |

**Key events to track:**
```javascript
// Track these custom events in Umami or simple beacon
umami.track('onboarding_complete', { category: 'coffee' });
umami.track('transaction_logged', { day_of_week: 'monday' });
umami.track('stats_viewed');
umami.track('paywall_seen');
umami.track('purchase_started');
umami.track('purchase_completed');
umami.track('share_tapped');
```

---

### Weekly Metrics Review

Every Monday, fill in this table in `metrics/YYYY-WW.md`:

```markdown
## Week N Metrics

### Growth
- New users this week:
- Total users to date:
- Source breakdown (Telegram / Reddit / Direct / Share):

### Engagement
- Day-1 retention (logged ≥2 times in first 24h):
- Day-7 retention:
- Avg transactions per active user:
- Paywall seen:
- Paywall converted:

### Revenue
- New purchases:
- Total revenue:
- Cumulative revenue:

### Qualitative
- Best user quote this week:
- Top support question:
- Feature request count:

### Decision
- 🟢 On track / 🟡 Adjust / 🔴 Problem
- Next week focus:
```

---

### PMF Thresholds

| Timeframe | Metric | 🔴 Pivot | 🟡 Adjust | 🟢 Scale |
|-----------|--------|---------|---------|---------|
| Week 2 | Day-1 retention | < 20% | 20–39% | ≥ 40% |
| Week 4 | Day-7 retention | < 20% | 20–39% | ≥ 40% |
| Week 4 | Organic users | < 50 | 50–199 | ≥ 200 |
| Week 6 | Paywall conversion | < 1% | 1–2.9% | ≥ 3% |
| Week 8 | D30 retention | < 15% | 15–24% | ≥ 25% |
| Month 3 | Revenue | < $100 | $100–499 | ≥ $500 |

**Retention benchmarks for context:**
- Consumer finance apps median D7: ~20–25%
- Good consumer apps: 40%+
- Great (PMF): 50%+
- Your target: 40% D7 as "go" signal

---

### When to Pivot

Trigger investigation if **two or more** of these are true simultaneously:
1. D7 retention < 20% for 2 consecutive cohorts
2. Paywall conversion < 0.5% after 500+ paywall views
3. No organic word-of-mouth (share mechanic never used)
4. Qualitative feedback: "cool idea but I don't come back"

**Pivot options (ordered by proximity to current product):**
1. **Mechanic pivot:** Shame → Celebration. Track the money you SAVED by skipping the habit. ("You didn't buy coffee today — $5.50 saved. $2,013/year in savings.")
2. **Scope pivot:** Add a second habit track (but keep it at 2 max). Test if restriction was actually hurting.
3. **Audience pivot:** Target smokers specifically — higher severity pain, clearer annual number.
4. **Format pivot:** Weekly email digest instead of daily app → lower friction retention.

---

## KILL CRITERIA

These are hard stops. If hit, pause and reassess before spending more time.

### 48-Hour Kill (Validation)
```
IF landing conversion < 5%
AND Reddit pain comments < 10
AND email signups < 10
THEN → Stop. Rewrite positioning or pivot hypothesis.
     → Do NOT build MVP yet.
```

### Week 2 Kill (Early Product)
```
IF first 20 beta users have D7 retention < 10%
AND qualitative feedback shows confusion about core mechanic
THEN → Stop building features.
     → Do intensive user interviews (5 calls minimum).
     → Fix core loop before adding anything.
```

### Week 6 Kill (Launch)
```
IF organic users < 50 total after 3 weeks of distribution
AND no one has used the share mechanic
AND 0 purchases in first 2 weeks of paywall
THEN → Product-market fit is not there.
     → Options: pivot mechanic, pivot audience, or park the project.
```

### Month 3 Kill (Sustainability)
```
IF revenue < $50 total (not MRR — cumulative)
AND D30 retention < 10%
AND growth is flat or declining
THEN → Kill or open-source and move on.
     → Lesson: shame mechanic alone not enough. Need social/viral loop.
```

---

## APPENDIX: Quick Reference

### Commands to Bookmark

```bash
# Local dev
npm run dev

# Deploy to GitHub Pages
git push origin main  # auto-deploys via GitHub Actions

# Kilo CLI for feature work
kilo run --auto "implement [feature description] in src/screens/[screen].tsx"

# Check Telegram Mini App in browser
# Add ?tgWebAppData=... for testing, or use BotFather Menu button
```

### Key URLs to Set Up

| Thing | URL | Notes |
|-------|-----|-------|
| Bot | t.me/YourBotName | Set up via @BotFather |
| Mini App | lvpjsdev.github.io/anti-budget | Configured in BotFather |
| Landing | carrd.co/anti-budget | Smoke test |
| Analytics | your-umami.vercel.app | Self-hosted |
| GitHub repo | github.com/lvpjsdev/anti-budget | Source + deploy |

### Useful Telegram Mini App Debugging

```typescript
// Always call this first
WebApp.ready();

// Useful for debugging
console.log('Platform:', WebApp.platform);
console.log('Version:', WebApp.version);
console.log('User:', WebApp.initDataUnsafe.user);
console.log('Color scheme:', WebApp.colorScheme);
console.log('Viewport:', WebApp.viewportHeight, WebApp.viewportStableHeight);

// Enable closing confirmation (prevents accidental close mid-entry)
WebApp.enableClosingConfirmation();
```

### The "Shame Loop" — Core Experience (Never Break This)

```
User opens app
    ↓
[If first time] Pick ONE habit (coffee/delivery/etc)
    ↓
See current month total prominently
    ↓
See annual projection: "$1,524 this year = ✈️ flight to Tokyo"
    ↓
[Optional] Log a new expense (< 5 sec)
    ↓
Number updates. Shame refreshes. User closes.
    ↓
Tomorrow: repeat.
```

**This loop must be < 10 seconds from open to close for daily users.
Protect it at all costs. Any feature that adds friction to this loop is wrong.**

---

*Last updated: 2026-04-21*
*Next review: After 48h smoke test results*
