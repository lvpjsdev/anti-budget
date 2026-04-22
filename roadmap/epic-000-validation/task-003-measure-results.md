# Task 003: Measure Results & Make Go/No-Go Decision

**Epic:** epic-000-validation  
**Status:** 🔲 TODO  
**Estimated Effort:** 2 hours active (passive monitoring over 46 hours)  
**Type:** Non-code (analysis + decision)

---

## Goal

Collect all signals from the 48-hour smoke test, score them against the kill criteria, document exact phrases users used, and make a definitive Go/No-Go decision that gets written into DECISIONS.md.

---

## Acceptance Criteria

- [ ] Metrics collected and logged every 4 hours in a tracking sheet or notes file
- [ ] `VALIDATION-RESULTS.md` created with full data snapshot at 48h mark
- [ ] Decision documented in `DECISIONS.md` with rationale
- [ ] If green: email list receives "we're building it" message within 48h of decision
- [ ] If yellow: adjusted copy tested, second post live within 24h
- [ ] If red: pivot hypothesis documented before any code is written
- [ ] Top 5 exact phrases from comments captured (for future copywriting/onboarding)

---

## Estimated Effort

- **4 hours total active work** spread over 48 hours
- Check every 4 hours: ~5 min per check × 12 checks = 1h
- Final analysis + decision write-up: 1h

---

## Dependencies

- [task-001-carrd-landing.md](./task-001-carrd-landing.md) — page must be live
- [task-002-reddit-post.md](./task-002-reddit-post.md) — post must be live

---

## Notes / Implementation Hints

### Tracking Sheet (Manual — Google Sheets or file)

Create `/projects/anti-budget/VALIDATION-RESULTS.md` and update every 4 hours:

```markdown
# Validation Results — Anti-Budget App

## Timestamps

| Time | Landing Visits | Signups | Conversion % | Reddit Upvotes | Pain Comments |
|------|---------------|---------|-------------|----------------|---------------|
| T+4h  | | | | | |
| T+8h  | | | | | |
| T+12h | | | | | |
| T+24h | | | | | |
| T+36h | | | | | |
| T+48h | | | | | |

## Final Score (48h)

- Landing conversion: __% (target ≥10%)
- Email signups: __ (target ≥50)
- Reddit upvotes: __ (target ≥100)
- Reddit pain comments: __ (target ≥30)
- "Want this app" responses: __ (target ≥5)

Green signals: __/5

## Decision: 🟢 BUILD / 🟡 ADJUST / 🔴 STOP

## Rationale
[Write 2-3 sentences explaining the decision]

## Top User Phrases (for copy/onboarding)
1. "..."
2. "..."
3. "..."
4. "..."
5. "..."

## Next Step
[Immediate next action after this decision]
```

### Scoring Logic

**4–5 green → Full speed to MVP:**
- Archive comments with pain signals (screenshot)
- Email list: "We're building it. Here's your early access when it's ready: [bot link]"
- Start epic-001-project-scaffold immediately

**2–3 green → Adjust and retest:**
- Read all comments: what exact phrase triggered the most engagement?
- Rewrite headline to match users' own language
- Post in a different subreddit (see backup list in task-002)
- Wait 24 more hours, then build regardless

**0–1 green → Stop:**
1. First check: did you get traffic but no signups?
   - Yes → Problem is real, copy is wrong. Rewrite and repost.
   - No → Problem signal is weak. Pivot.
2. If copy rewrite also fails → document in DECISIONS.md and do NOT start coding

### What "Pain Comments" Look Like

Count a comment as a "pain comment" if it:
- Shares their own dollar amount ("I spend $X on...")
- Expresses shock/regret at their own habits
- Says they've tried to track this and failed
- Asks for help tracking one specific habit
- Tags someone else ("@username you need to see this")

Do NOT count:
- Generic advice ("just use YNAB")
- Skeptical comments ("this is dumb")
- Off-topic

### Qualitative Goldmines to Look For

These comment patterns = strong signals to save verbatim:

1. **The exact habit they can't stop:** "I know it's bad but I can't stop ordering DoorDash every night"
2. **The annual realization moment:** "I did the math once and literally closed the tab"
3. **The comparison they made:** "That's my car payment" / "That's a vacation"
4. **The emotional language:** "embarrassed", "disgusted", "ashamed", "can't look"
5. **The feature they want:** "I just need something simple, not a whole budget"

These phrases become:
- Onboarding copy
- App store description
- Reddit post for Phase 2
- "Shame equivalents" in the stats screen

### Email to Send If Green

Subject: `We're building it 🔨`

```
Hey [first name or "friend"],

You signed up because you wanted to know your number.

We're building it.

One habit. One annual number. "It = X" shame mechanic.
No bank links. No subscriptions. Offline-first.

Telegram Mini App + PWA. ~3 weeks to beta.

You'll get first access when it's ready.

— [your name]

P.S. What's your habit? Reply and tell me. It helps us build the right thing.
```

### If Red: Pivot Options to Evaluate

Before closing the door, check these:

| Option | What changes | Signal needed |
|--------|-------------|---------------|
| Copy pivot | Different headline, same product | Retest with "Show me my number" framing |
| Category pivot | Target smokers specifically (higher pain) | New post in r/stopsmoking, r/quitsmoking |
| Mechanic pivot | Savings instead of shame ("money you saved") | Retest with "You didn't buy coffee today — $5.50 saved" |
| Audience pivot | ADHD + impulse spending | r/ADHD, r/ADHD_finance |
