# Task 002: Post to Reddit

**Epic:** epic-000-validation  
**Status:** 🔲 TODO  
**Estimated Effort:** 1 hour  
**Type:** Non-code (manual task)

---

## Goal

Post an authentic, story-driven post in at least one subreddit that surfaces the "annualized spending shock" pain and measures whether the community resonates — without explicitly pitching a product.

---

## Acceptance Criteria

- [ ] Primary post published in r/personalfinance OR r/povertyfinance
- [ ] Post uses story-first format (no product pitch in the body)
- [ ] Landing page link is ready to share if anyone asks "is there an app?"
- [ ] At least one backup subreddit identified in case primary is removed
- [ ] Post is monitored for comments every 4 hours during the 48h window
- [ ] Every comment with a pain story gets a reply within 4 hours
- [ ] Results logged in `VALIDATION-RESULTS.md`

---

## Estimated Effort

**1 hour**
- 20 min: Write post (use template below, adapt)
- 10 min: Proofread + final check
- 10 min: Post + add flair if required
- 20 min: First wave of comment replies

---

## Dependencies

- [task-001-carrd-landing.md](./task-001-carrd-landing.md) — landing URL must be live before posting

---

## Notes / Implementation Hints

### Primary Post — r/personalfinance (2.1M members)

**Title:**
> "I just realized I spent $1,089 on Starbucks this year and I want to cry"

**Body:**
```
Had a rough moment this week when I actually added up every Starbucks visit this year.

$1,089. That's a flight to Japan. That's 2 months of groceries.

The weird thing is every single purchase felt completely justified in the moment — it's 
just $5.50. But the annual number is what actually broke my brain.

Does anyone else obsessively track just ONE spending habit like this? I've tried YNAB but 
it's way too complex for what I actually need. I just want to stare at my one stupid 
number and feel bad about it.

What do you use?
```

**Rules:**
- NO product mention in the body. Not even a hint.
- If someone asks "is there an app for this?" → reply: `"Actually building one right now. Here's the landing if you want to follow along: [UTM link]"`
- If someone comments with their own number → reply warmly, ask what they track, build rapport

### Backup Post — r/povertyfinance (adapt tone)

**Title:**
> "Tracked every single coffee purchase for 6 months. The annual projection destroyed me."

**Body:**
```
I know this sounds dramatic but hear me out.

I started tracking just my daily coffee/energy drink habit. Nothing else. Just that one thing.

6 months in: $534. Annualized: ~$1,068/year.

That's not a flight to Japan for me. That's my car insurance. That's a month of rent.

Anyone else track just one habit this way? I tried budgeting apps but they want you to 
track EVERYTHING and it's overwhelming. I just need to confront this one number.
```

### Russian-Language Telegram Post (Optional, same 48h window)

Find 2–3 finance channels via search: "личные финансы", "экономия", "финансы"

**Template:**
```
Посчитал сколько трачу на кофе в год. Оказалось ₽47,000.

Это поездка в Турцию. Мозг не справляется.

Каждый раз казалось — ну это же просто 200 рублей. Но цифра за год убивает.

Вы считаете что-то одно так? Что отслеживаете?
```

Add landing link only if the channel allows links. Otherwise, reply to commenters.

### Subreddit Targeting Matrix

| Subreddit | Members | Tone | Best angle |
|-----------|---------|------|-----------|
| r/personalfinance | 2.1M | Practical, advice-seeking | Annual shock number |
| r/povertyfinance | 800K | Struggling, relatable | Cost vs. necessities |
| r/frugal | 1.2M | Frugality-positive | "Track the one thing leaking your budget" |
| r/NoSpend | 150K | Accountability-focused | Track the one habit you can't quit |
| r/ADHD_finance | 50K | Impulse spending | "Quick 5-second habit log" |

### Do Not

- ❌ Mention the app or landing in the original post body
- ❌ Cross-post simultaneously (looks spammy, gets removed)
- ❌ Reply to every comment with "check out my app"
- ❌ Post with a brand-new Reddit account (use existing account with karma)
- ❌ Delete the post if upvotes are low — let it breathe 48 hours

### Timing

Best times to post for maximum early visibility:
- **US morning:** 8–10 AM EST (Mon–Wed)
- **Weekend afternoon:** Saturday 12–2 PM EST

Avoid: Friday evening, Sunday night (lower engagement).

### Comment Engagement Script

When someone shares their own number:
> "Oof, [their number] — that's [relatable equivalent]. What habit is it? Curious if 
> there's a pattern with what people can't stop tracking."

When someone asks for an app:
> "Funny you ask — I'm actually building something specifically for this. Just a 
> simple tracker: one habit, one annual number, nothing else. Landing here if curious: [link]"

When someone says they just use a spreadsheet:
> "Spreadsheets work! I used one too. The annoying part for me was mobile logging 
> — I'd forget to enter things if it wasn't < 5 seconds. Hence the app idea."
