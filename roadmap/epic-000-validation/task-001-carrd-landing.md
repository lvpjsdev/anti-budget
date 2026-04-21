# Task 001: Create Carrd Landing Page

**Epic:** epic-000-validation  
**Status:** 🔲 TODO  
**Estimated Effort:** 1 hour  
**Type:** Non-code (manual task)

---

## Goal

Publish a single-page landing with email capture that measures whether people care enough about annualized spending shame to hand over their email address.

---

## Acceptance Criteria

- [ ] Landing page is live and accessible via public URL
- [ ] Page loads in < 3 seconds on mobile
- [ ] Headline clearly states the value proposition (annualized cost shock)
- [ ] Email capture form is visible above the fold
- [ ] CTA button label is specific (not generic "Submit")
- [ ] UTM-tagged URLs exist for at least 2 sources (reddit_personalfinance, telegram)
- [ ] Conversion tracking is active (Carrd form submissions OR Tally.so count)
- [ ] Page renders correctly on mobile (test on iPhone + Android)

---

## Estimated Effort

**1 hour total**
- 30 min: Build page in Carrd
- 15 min: Write and proof copy
- 15 min: Test links, UTM params, form submission

---

## Dependencies

None. This is the first task.

---

## Notes / Implementation Hints

### Option A: Carrd (Recommended — fastest)

1. Go to carrd.co → create free account → "Build a site" → blank template
2. Use this copy structure:

**Headline (large, top):**
> "Сколько ты потратил на кофе в этом году?"
> *(or English variant: "How much did you spend on coffee this year?")*

**Subheadline:**
> "Узнай правду. Одна привычка. Одна цифра. Без банков и подписок."

**Hero visual (simple — don't overthink):**
- Big bold number: `$1,524`
- Below it: `= ✈️ Перелёт в Токио`
- Use Carrd's text/image block. No design skills needed.

**CTA button:**
- Label: `"Хочу знать правду →"` (or `"Show me my number →"`)
- Connects to email form (Carrd's built-in form widget)

**Footer line (trust signal):**
> "Без банков. Без подписок. Без лишнего."

3. Enable Carrd form → set up email notifications to your email
4. Publish → get URL like `anti-budget.carrd.co`

### Option B: GitHub Pages (more control)

```html
<!-- index.html — minimal but works -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Анти-бюджет — сколько твоя привычка стоит в год?</title>
</head>
<body>
  <h1>Сколько ты потратил на кофе в этом году?</h1>
  <p>Узнай правду. Одна привычка. Одна цифра. Без банков.</p>
  <div class="hero-number">$1,524</div>
  <p>= ✈️ перелёт в Токио</p>
  <!-- Embed Tally.so form for email capture -->
  <iframe src="https://tally.so/embed/YOUR_FORM_ID" width="100%" height="200"></iframe>
</body>
</html>
```

- Deploy: `git push` → GitHub Pages at `lvpjsdev.github.io/anti-budget-landing`
- Embed [Tally.so](https://tally.so) form (free, shows response count)

### UTM Links to Create

Create these 3 links for tracking:
```
https://anti-budget.carrd.co/?utm_source=reddit_personalfinance
https://anti-budget.carrd.co/?utm_source=reddit_povertyfinance
https://anti-budget.carrd.co/?utm_source=telegram
```

Use [UTM.io](https://utm.io) or just build them manually. Carrd doesn't auto-track UTM, but Tally.so embeds can pass them through.

### Analytics (pick one)

- **Simplest:** Tally.so shows total form submissions. That's enough.
- **Better:** Add [Umami](https://umami.is) snippet (free, self-host on Vercel). Track `pageview` + `cta_click`.
- **Overkill for smoke test:** Don't bother with GA4.

### Copy Variants to A/B Test (manually)

If first post isn't converting, try headline swap:
- Variant A: `"Сколько ты потратил на кофе в этом году?"`
- Variant B: `"Ваша привычка стоит $1,524 в год. Хотите знать вашу цифру?"`
- Variant C: `"Your coffee costs $127/month. That's $1,524/year. Here's the number you've been avoiding."`

### What Counts as a Conversion

Conversion = email submitted / page visits × 100

Good benchmarks:
- 5% = minimal signal (people are curious but not excited)
- 10% = strong signal (copy + problem are resonating)
- 20%+ = exceptional (this is a hot problem)
