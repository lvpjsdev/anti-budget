# Epic 000: Validation — 48-Hour Smoke Test

**Phase:** 0  
**Status:** 🔲 TODO  
**Owner:** Solo founder  
**Estimated Duration:** 48 hours  
**Type:** Non-code validation

---

## Goal

Prove that real people feel pain about tracking a single spending habit and will sign up for a solution — before writing a single line of product code.

---

## Context

We have ~20 data points from prior Reddit/research analysis. This is NOT starting from zero. This smoke test confirms the signal is real and measures how well our copy + positioning resonates.

**We are NOT building yet. We are measuring.**

---

## Tasks

| Task | Description | Effort |
|------|-------------|--------|
| [task-001-carrd-landing.md](./task-001-carrd-landing.md) | Create and publish landing page with email capture | 1h |
| [task-002-reddit-post.md](./task-002-reddit-post.md) | Write and post to r/personalfinance (and backup sub) | 1h |
| [task-003-measure-results.md](./task-003-measure-results.md) | Monitor, respond, collect data, make Go/No-Go decision | 46h |

**Total estimated effort:** ~48 hours (mostly passive monitoring)

---

## Exit Criteria — Green Light to Build

Score each signal. Need 4/5 green to proceed to MVP.

| Signal | 🔴 Red (Kill) | 🟡 Yellow | 🟢 Green (Build) |
|--------|--------------|-----------|-----------------|
| Landing conversion rate | < 5% | 5–9% | ≥ 10% |
| Email signups | < 10 | 10–49 | ≥ 50 |
| Reddit upvotes | < 50 | 50–99 | ≥ 100 |
| Reddit pain comments | < 10 | 10–29 | ≥ 30 |
| "Want this app" responses | 0 | 1–4 | ≥ 5 |

---

## Red Light Protocol

If 0–1 green after 48 hours:
1. Check: did you get traffic but no signups? → Problem is real, copy is wrong. Rewrite headline.
2. Check: no engagement at all? → Problem signal is weak. Consider pivot.
3. Repost in r/frugal or r/NoSpend with different framing before fully pivoting.

---

## Deliverables

- [ ] Landing page live at `[yourname].carrd.co`
- [ ] Reddit post published with UTM tracking links
- [ ] `VALIDATION-RESULTS.md` file created with all data points
- [ ] Go/No-Go decision documented in `DECISIONS.md`
