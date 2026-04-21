# Task 002: Reddit Content Calendar

**Epic:** epic-005-launch  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Distribution (manual task)

---

## Goal

Plan and execute a 4-week Reddit posting schedule with one authentic story post per week in different subreddits — building SEO-compounding presence and community trust without triggering spam filters.

---

## Acceptance Criteria

- [ ] 4-week content calendar created in `metrics/reddit-calendar.md`
- [ ] At least 2 posts published and live by end of Week 6
- [ ] Each post follows the story-first format (no overt product pitch in body)
- [ ] Each post targets a different subreddit (no cross-posting)
- [ ] Performance tracked: upvotes, comments, landing page referral visits, bot starts
- [ ] Best-performing post format documented for future use
- [ ] Reddit account has sufficient karma before posting (use an aged account, not brand-new)

---

## Estimated Effort

**3 hours**
- 1h: Calendar planning + post writing
- 1h: Posting + initial comment monitoring (first 2 hours after each post)
- 1h: Ongoing engagement (replies to comments, tracking results)

---

## Dependencies

- App must be deployed and functional
- Landing page or bot link ready to share when asked

---

## Notes / Implementation Hints

### 4-Week Content Calendar

```markdown
# Reddit Content Calendar

## Week 4 — r/personalfinance
Title: "I built an app after my Starbucks moment — here's what I actually learned"
Angle: Personal story of building the tracker after the $1,089 realization
CTA: "Built it for myself, sharing in case anyone else finds it useful: [bot link]"
Best day: Tuesday, 8–10 AM EST

## Week 5 — r/povertyfinance  
Title: "Track the one habit bleeding your budget dry — not your whole budget"
Angle: Frame as advice (not product launch). Most comments will be people sharing their own number.
CTA: Mention app only if asked in comments
Best day: Wednesday, 9–11 AM EST

## Week 6 — r/frugal
Title: "Why I stopped trying to budget everything and track only one thing"
Angle: Anti-complexity argument. "YNAB is great but I needed a scalpel, not surgery."
CTA: Link in comments (not body), only after building rapport
Best day: Monday, 8–10 AM EST

## Week 7 — r/NoSpend
Title: "Accountability tool for the one purchase you just can't stop making"
Angle: NoSpend community loves accountability tools. Position as shame journal.
CTA: Direct mention of app is acceptable here (community is tool-friendly)
Best day: Sunday, 12–2 PM EST

## Backup subreddits (if primary removed or low engagement):
- r/ADHD_finance — impulse spending angle
- r/financialindependence — opportunity cost framing
- r/Frugal (smaller, tighter community)
- r/minimalism — anti-overconsumption angle
```

### Post Templates

**Week 4 — r/personalfinance (Builder's Story)**
```
Title: "I built an app after my Starbucks moment — here's what I actually learned"

Body:
Six months ago I had the classic moment: added up my Starbucks visits for the year. 
$1,089. Not a week's groceries — a full year's worth. Gone.

The weird part wasn't the number itself. It was that every single purchase felt fine 
in the moment. $5.50 is nothing. $1,089 is not nothing.

I looked for a simple app to track just this one habit. YNAB was overkill. Mint is 
dead. PerDiem is basically abandonware. So I built one.

Key things I learned building it:
1. The annualized number is the only number that matters. Not the daily cost — the year.
2. Forced single-category is actually a feature. The moment you add a second category, 
   it becomes a budget app and you stop using it.
3. "What you could have bought" is more emotionally resonant than raw numbers.

The app: one habit, one number, no bank links, no subscription. Works in Telegram and 
as a PWA. Here it is if anyone wants to try: [link]

What's the habit you've been avoiding calculating?
```

**Week 5 — r/povertyfinance (Relatable)**
```
Title: "Track the one habit bleeding your budget dry — not your whole budget"

Body:
I have a theory: trying to budget everything is why most people stop budgeting.

It's not motivating to see all your spending laid out. It's exhausting. You feel bad 
about food, AND rent, AND gas, AND entertainment simultaneously. It's too much.

But if you track just one thing — the one habit you already know is a problem — 
it's actually manageable. The number is small enough to feel controllable but big 
enough once annualized to actually matter.

For me it's DoorDash. I don't even like DoorDash. I just don't want to cook at 11pm.

I started tracking it. Just that. $187 last month. That's $2,244/year. That's a 
plane ticket home for the holidays I haven't been able to afford.

I'm not saying I've stopped. But I know the number now.

Anyone else do this? What do you track?
```

### Rules for Reddit Promotion

**Do:**
- Post in communities you actually participate in
- Lead with a genuine story or insight
- Mention the app only when it's natural (builder story) or when asked
- Respond to every comment within 4 hours on posting day
- Acknowledge criticism honestly ("fair point, it's an MVP")

**Don't:**
- Post "I built an app, check it out" — this gets removed immediately
- Cross-post to multiple subreddits simultaneously (looks like spam)
- Comment "try my app" on other people's posts
- Post with an account less than 30 days old
- Argue with critics — just acknowledge and move on

### Account Karma Requirements

Most personal finance subreddits require:
- r/personalfinance: account age > 90 days, karma > 50
- r/povertyfinance: relatively lenient
- r/frugal: moderate

If your account doesn't qualify, use an aged personal account (not a brand account).

### SEO Value

Each Reddit post + its comments becomes a Google search result for long-tail queries:
- "track one spending habit app"
- "coffee spending tracker app"
- "annual spending shock"
- "simple habit spending tracker no bank"

This compounds over months. A well-received post from Week 4 will still be driving PWA installs in Month 6.

### Tracking Results

```markdown
# Reddit Campaign Results

| Date | Subreddit | Post Title (short) | Upvotes | Comments | Referral Visits | Bot Starts |
|------|-----------|-------------------|---------|----------|----------------|------------|
| W4 | r/pf | Starbucks moment | 234 | 67 | 89 | 23 |
| W5 | r/poverty | One habit | 156 | 44 | 41 | 11 |

## Top Comments (save for copy)
1. "..."
2. "..."

## Key Insights
- [What worked]
- [What to change]
```
