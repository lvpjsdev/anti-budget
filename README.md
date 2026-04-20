# Anti-Budget App 🐾💸

> Выбери одну "плохую" привычку трат → логируй за 5 секунд → смотри как растёт годовая цифра → стыдись.

## Суть продукта

Не бюджет-трекер. Только одна категория (кофе, UberEats, сигареты).
Главный механик: **annualized cost shock** — "$127 в этом месяце = $1 524 в год = перелёт в Токио".

## Дистрибуция

- **Telegram Mini App** (основной канал) — монетизация через Telegram Stars
- **PWA** — установка без сторов, работает офлайн

## Конкуренты

| Приложение | Слабость |
|---|---|
| PerDiem | Нет shame механика, нет annualized shock |
| YNAB | Слишком сложный, $109/год |
| Mint | Мёртв с января 2024 (10M пользователей без замены) |

## Дифференциаторы

1. **Annualized cost shock** — крупная годовая цифра + "это = X"
2. **Принудительный выбор ONE thing** — нельзя добавить 12 категорий, это фича
3. **"Что на эти деньги можно купить"** — конкретные эквиваленты
4. **Offline-first** — без банков, без аккаунтов, без синка

## Монетизация

Бесплатно + one-time unlock $4.99–$6.99 (НЕ подписка — subscription fatigue реален).
Telegram Stars для Telegram Mini App.

## Стек

- React + Vite (веб)
- `@twa-dev/sdk` — Telegram Web App API
- SQLite-wasm / IndexedDB — офлайн хранилище
- Service Worker — PWA офлайн режим

## Ссылки

- [market-research-anti-budget-app.md](../market-research-anti-budget-app.md)
- [user-research-bad-habit-tracker.md](../user-research-bad-habit-tracker.md)
- [anti-budget-app-research.md](../anti-budget-app-research.md)
