# Validation Plan — Anti-Budget App

## Problem Validation Brief (Founder OS — Phase 1)

```yaml
problem_validation:
  problem_statement: "Люди с плохими привычками трат (кофе, доставка еды, такси) 
    не знают реальную годовую сумму своих трат, потому что мозг 
    фокусируется на разовой транзакции ($5.50), а не на накопленном итоге ($1,375/год)"

  existing_alternatives:
    - name: "YNAB"
      weakness: "Слишком сложный, требует 34 дня обучения, $109/год"
      price: "$109/год"
    - name: "PerDiem"
      weakness: "Нет annualized shock, нет shame механика, едва живой"
      price: "Бесплатно + $6.99 one-time"
    - name: "Mint"
      weakness: "Мёртв с января 2024 — 10M пользователей без замены"
      price: "Был бесплатным"

  frequency: "daily"
  severity: "painful"
  willingness_to_pay: "would-pay (one-time, not subscription)"

  target_customer:
    demographics: "25-40 лет, работающие, городские, Millennials/Gen Z"
    psychographics: "Знают что тратят много на привычку, но 'не готовы смотреть правде в глаза'"
    watering_holes: "r/personalfinance, r/povertyfinance, r/NoSpend, r/frugal, TikTok finance, Telegram каналы"

  validation_status: "talked-to-20 (Reddit данные, 3 агента-исследователя)"
```

## Kill Criteria (остановиться если...)

- Лендинг conversion < 5% за 48 часов
- Reddit пост < 15 комментариев с реальной болью
- После 2 недель в Telegram: < 50 пользователей органически
- Никто не нажимает "купить" ($4.99 one-time)

## 48-часовой Smoke Test

### Час 1 (твоя работа, ~30 мин):
1. Создать лендинг на **Carrd** ($0):
   - Заголовок: "Сколько ты потратил на [привычку] в этом году?"
   - Подзаголовок: "Узнай правду. Одна категория. Без банков. Без подписок."
   - CTA: "Уведоми меня о запуске" (email signup)
   - URL: carrd.co или GitHub Pages

2. Пост в **r/personalfinance** или **r/povertyfinance**:
   > "I realized I spent $1,089 on Starbucks this year and it broke my brain.
   > Anyone else track just ONE spending habit? What app do you use?"

3. (Опционально) Пост в русском Telegram-канале про финансы

### Метрики успеха через 48 часов:
| Метрика | Плохо | Хорошо | Отлично |
|---|---|---|---|
| Лендинг conversion | < 5% | 10%+ | 20%+ |
| Reddit upvotes | < 50 | 100+ | 500+ |
| Reddit комментарии с болью | < 10 | 30+ | 100+ |
| Email signups | < 10 | 50+ | 200+ |

**Зелёный свет → идём в разработку.**
**Жёлтый (частичное подтверждение) → корректируем позиционирование.**
**Красный → пивот или смена гипотезы.**

## MVP Scope (после валидации)

Подход: **Coded MVP** (Telegram Mini App + PWA)
Timeline: 2-3 недели с KiloClaw/Kilo CLI

### Железный треугольник фич:
1. **Онбординг** — выбор одной категории (принудительно, нельзя добавить ещё)
2. **Логгер** — сумма + заметка, < 5 секунд
3. **Shame Stats** — текущий месяц + проекция на год + "это = X"
4. **История** — список транзакций + удаление
5. **Напоминание** — ежедневный push (локальный)

### Вырезать из v1:
- Графики и аналитика
- Экспорт
- Несколько категорий
- Синк между устройствами
- Биометрическая защита

## Pricing Decision

**Модель:** Freemium + $4.99 one-time unlock (НЕ подписка)
**Обоснование:** Subscription fatigue в finance нише. PerDiem доказал модель.
**Telegram Stars:** Параллельно для Telegram Mini App аудитории.

**Копирайт сам пишет себя:**
> "Приложение, которое помогает не тратить деньги, само не должно тратить деньги каждый месяц"
