# Task 001: Telegram Channel Seeding

**Epic:** epic-005-launch  
**Status:** 🔲 TODO  
**Estimated Effort:** 3 hours  
**Type:** Distribution (manual task)

---

## Goal

Identify 5–10 relevant Telegram channels, write authentic personal-story posts (not ads), and seed the app to real users in Week 4 — the first major distribution push after beta.

---

## Acceptance Criteria

- [ ] Spreadsheet/file created: `metrics/telegram-channels.md` with channel list, contact method, post date, result
- [ ] At least 5 channels identified that allow member posts or admin-posted promotions
- [ ] Post template written and adapted for each channel's tone
- [ ] At least 3 posts published in Week 4
- [ ] Each post uses bot link: `t.me/YourBotName`
- [ ] Responses monitored and replied to within 2 hours
- [ ] User count before/after each post logged
- [ ] Top-performing post format identified by end of Week 5

---

## Estimated Effort

**3 hours**
- 1h: Channel research + list building
- 1h: Post writing + adaptation per channel
- 1h: Posting + monitoring + logging results

---

## Dependencies

- MVP must be deployed and accessible at `t.me/YourBotName`
- Share mechanic live (users can spread it themselves)

---

## Notes / Implementation Hints

### Channel Search Queries

In Telegram search:
```
личные финансы
экономия денег
финансы
управление деньгами
кофе (communities, not just news)
english: personal finance
english: frugal living
english: money saving
```

Also look for:
- r/personalfinance Telegram equivalents
- Expat communities (high disposable income, relatable habits)
- Digital nomad channels (UberEats/delivery guilt is universal)

### Target Channel Types

| Type | Why it works | Example query |
|------|-------------|---------------|
| Russian personal finance | Core audience, problem resonates deeply | "личные финансы" |
| Frugality/savings tips | Already track spending, want tools | "экономия" |
| Digital nomads | Delivery addiction is real | "nomad finance" |
| Anti-consumption | Shame mechanic aligns with their values | "minimalism" |
| Coffee/food lovers | Ironic self-awareness about spending | find by category |

### Post Templates

**Russian Finance Channel:**
```
Посчитал сколько потратил на кофе в этом году. Оказалось ₽58,000.

Это Таиланд на 2 недели. Мозг не обрабатывает.

Сделал приложение — трекер одной плохой привычки. Одна категория, одна цифра, 
никаких банков и подписок. За 5 секунд добавить трату.

Попробуйте: t.me/AntiBudgetBot

P.S. Напишите в комментах в что обходится ваша привычка в год. Интересно насколько 
все "нормальные" цифры на самом деле ненормальные.
```

**English International Channel:**
```
I just realized I've spent $1,089 on Starbucks this year. Again.

I built a tiny app that tracks just ONE spending habit. Not everything — just the one 
you can't stop. It tells you the annual total, what you could have bought instead, 
and nothing else.

No bank links. No subscription. Works offline.

→ t.me/AntiBudgetBot

What's your number? Drop it in the comments.
```

**Frugality Channel:**
```
The most effective thing I've done for my spending: tracked ONLY my worst habit.

Not a full budget. Just one line. UberEats. Every week I see the annual number grow.

It's now $2,100. I don't know if I'm less embarrassed or more. But I haven't quit.

Tracking tool (free): t.me/AntiBudgetBot — one habit, one number, no nonsense.
```

### How to Get Posted in Channels

**Method A — Post directly** (if channel allows member posts):
- Join the channel
- Use the "Create post" or just send to the chat if it's a group
- Best for community groups, not broadcast-only channels

**Method B — Contact admin** (for larger channels):
- Find the admin via channel info
- Send a brief message: "I made something your audience might find genuinely useful — a one-habit spending tracker. Not a paid promo, just sharing. Here's the app: [link]. Can I share in your channel?"
- No payment needed if your post is genuine value, not a sales pitch

**Method C — Build relationships first**:
- Comment genuinely in the channel for 1–2 weeks
- Then share naturally as part of a conversation
- This is the highest-quality path

### Tracking Template

Create `metrics/telegram-channels.md`:

```markdown
# Telegram Channel Tracking

| Channel | Members | Posted | Views | Bot Starts | Notes |
|---------|---------|--------|-------|------------|-------|
| @channel1 | 15K | 2026-04-28 | 234 | 12 | Russian, finance |
| @channel2 | 8K | 2026-04-29 | 89 | 4 | Nomad community |
| ... | | | | | |

## Notes
- Best performing post: [paste text]
- Worst: [paste text]  
- Insight: [what worked/didn't]
```

### Timing

Best times to post in Telegram channels:
- **Russia:** Monday–Thursday, 19:00–21:00 Moscow time
- **International:** Monday–Wednesday, 10:00–12:00 UTC

Avoid: weekends (less engagement), late nights, Friday afternoons.

### The "Shame Number" Hook

Every post should have a specific dollar/ruble amount in the first line.

- ❌ "I track my spending habits" — boring
- ✅ "I spent ₽58,000 on coffee this year" — shocking, relatable, specific

The number is the hook. Everything else is context.
