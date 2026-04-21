# Epic 004: Share Mechanic

**Phase:** 1 — MVP Build (Week 3)  
**Status:** 🔲 TODO  
**Owner:** Solo dev + Kilo CLI  
**Estimated Duration:** 2 days  
**Prerequisite:** epic-002 + epic-003 complete

---

## Goal

Build the viral loop: a "Share my shame" button on the Stats screen that generates a shareable image card with the user's annual spending number and sends it via Telegram or the native share sheet.

This single feature could be the #1 growth driver. Shame is inherently social.

---

## Why This Matters

The typical Telegram Mini App growth path: user shares → friend opens → friend installs.
The shame card mechanic makes this natural:

> "I spent $847 on UberEats this year. 😭 That's a trip to Bali.
> Track yours: t.me/YourBot"

This message is compelling because:
1. It's personal (real number from a real person)
2. It's relatable (everyone has a "bad" habit)
3. It's got a clear CTA to try it yourself

---

## Tasks

| Task | Description | Effort |
|------|-------------|--------|
| [task-001-shame-card-generator.md](./task-001-shame-card-generator.md) | Generate shareable image with user's annual number | 5h |
| [task-002-share-sheet.md](./task-002-share-sheet.md) | Native share API + Telegram-specific share flow | 3h |

**Total estimated effort:** 8 hours

---

## Exit Criteria

- [ ] "Share my shame 😭" button visible on Stats screen (for users with ≥ 1 month of data)
- [ ] Tapping it generates a card image showing: category, annual amount, equivalent
- [ ] User can share via Telegram (sends to a chat of their choice) or system share sheet
- [ ] Shared message includes bot link (`t.me/BotName`)
- [ ] Card looks good as a Telegram message preview
- [ ] Works on Android (tested on real device)

---

## Design of the Shame Card

```
┌─────────────────────────────┐
│  ☕                          │
│                             │
│  I spent                    │
│  $1,524                     │
│  on coffee this year        │
│                             │
│  That's ✈️ a flight to Tokyo│
│                             │
│  Track yours:               │
│  t.me/AntiBudgetBot         │
└─────────────────────────────┘
```

Background: gradient (shame purple/red or Telegram blue)
Text: white
Size: 1200×630 (OpenGraph standard, looks good in Telegram preview)
