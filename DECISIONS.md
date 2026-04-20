# DECISIONS

## 2026-04-21

### Выбор продукта: Anti-budget app
**Решение:** Строим anti-budget app как основной проект.
**Причина:** Доказанный рыночный gap (PerDiem есть, но без shame механика), вирусный потенциал (Starbucks $1089 кейс), низкая сложность MVP.
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
