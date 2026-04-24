# DECISIONS

## 2026-04-24

### Определение критериев убийства (Kill Criteria)
**Решение:** Проект закрывается, если выполняется ЛЮБОЕ из условий к 3 месяцам:
- Доход < $50 cumulative
- D30 retention < 10%
- Рост замедлился или отрицательный после distribution push
**Причина:** Позволяет быстро пасовать без эмоций. Ранний выход дешевле, чем месяцы бесплодной работы.

### Отказ от App Store/Play Store
**Решение:** Только Telegram Mini App + PWA. Без iOS/Android нативки.
**Причина:** 0$ девелоперских аккаунтов, нет ревью, нет 30% комиссии, быстро. Telegram аудитория уже есть. Риск: меньше органического трафика из сторов, но компенсируется вирусным шейрингом.

### Монетизация: One-time purchase + Telegram Stars
**Решение:** Freemium, $4.99–$6.99 one-time unlock (годовая проекция + кастомизация), Stars для TMA.
**Причина:** Subscription fatigue в finance-нише силён. PerDiem доказал, что one-time работает.

### Технический стек: React + Vite + @twa-dev/sdk + IndexedDB
**Решение:** Веб-стек, не Expo/React Native.
**Причина:** TMA = веб. Expo не нужен. PWA + Service Worker дают оффлайн. Индекс в IndexedDB через idb.

### Стратегия валидации (Phase 0): лендинг + Reddit BEFORE code
**Решение:** Запущен Carrd лендинг (https://antibudget.carrd.co/) до начала кода для проверки спроса.
**Результат:** Сигналы положительные (Reddit комментарии с high engagement, viral spending stories найдены), переход на Phase 1.

## 2026-04-21

### Выбор продукта: Anti-budget app
**Решение:** Строим anti-budget app как основной проект.
**Причина:** Доказанный рыночный gap (PerDiem есть, но без shame механика), вирусный потенциал (Starbucks $1089 кейс), низняя сложность MVP.
**Альтернативы:** Трекер лекарств для питомцев (отложен, не забыт).

### Дистрибуция: Telegram Mini App + PWA
**Решение:** НЕ идём через App Store / Play Store.
**Причина:** $0 на developer accounts, нет ревью, нет 30% комиссии, быстрый деплой, аудитория уже в Telegram.
**Компромисс:** Меньше органического трафика из сторов, но это компенсируется вирусным механиком sharing.

### Монетизация: One-time purchase, не подписка
**Решение:** Freemium + $4.99–$6.99 one-time unlock (+ Telegram Stars).
**Причина:** Subscription fatigue силён в finance-нише. PerDiem доказал модель.

### Стек: React + Vite + @twa-dev/sdk
**Решение:** Веб-стек вместо Expo/React Native.
**Причина:** PWA + Telegram Mini App = веб. Expo отпадает.
