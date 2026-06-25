# Research — Feedback→Roadmap (рабочее имя)

> Источник по каждой цифре помечен ссылкой. Иерархия: (1) офиц. сайты конкурентов →
> (2) отзывы/сравнения → (3) отраслевая аналитика. Где первичного источника не нашлось —
> помечено «оценка».

## 1. Карта вопросов ресёрча

| # | Что нужно было узнать | Что узнали (кратко) |
|---|------------------------|----------------------|
| A1 | Фичи/цена/позиционирование Canny, Productboard, Sleekplan | Закрыто — см. §2 |
| A2 | Как зрелые продукты приоритизируют (для команд 3-15) | Закрыто — RICE/WSJF + votes + custom scoring; для малых рекомендуют lightweight (§8, B1) |
| A3 | Есть ли чат-ориентированные сборщики фидбэка | **Да, и их несколько** — Ducalis, Featurebase, Savio, Olvy, Sleekplan AI. Премиса «незанятой точки» из брифа требует ревизии (§2, §8) |
| A4 | Где зрелые игроки слабы → наши возможности | Закрыто — цена/сложность для малых, нет нативного Telegram у Canny/Productboard (§2 SWOT) |
| B1 | Модель приоритизации для команд 3-15 | Закрыто — §8 |
| B2 | Отбор фидбэка из шума в чатах | Закрыто — 2 паттерна: ручной выбор vs AI авто-извлечение (§8, §2 UX-паттерны) |
| B3 | Точка входа в чате | Закрыто — message-action / slash-команда / форвард-в-бота / AI-скан (§8) |
| C1 | Боли PM малых команд | Частично — через отзывы/сравнения (§3) |
| C2 | Объём/тренд рынка | Закрыто — §ниже |

**Рынок (фон, источник 3):** сегмент Feedback & Reviews Management Software — $16.73 млрд (2025) →
$19.56 млрд (2026), CAGR 16.9% ([The Business Research Company](https://www.thebusinessresearchcompany.com/report/feedback-and-reviews-management-software-global-market-report)).
Более узкий «Customer Feedback Software» — $1.99 млрд (2025) → $2.26 млрд (2026) → $2.55 млрд (2027),
CAGR 13.2% ([Global Growth Insights](https://www.globalgrowthinsights.com/market-reports/customer-feedback-software-market-124842)).
Вывод: рынок крупный и растущий двузначными темпами; ниша «малые команды + чаты» — внутри него.

## 2. Конкурентный анализ

| # | Конкурент | Ключевые фичи | Позиционирование | Цена |
|---|-----------|---------------|------------------|------|
| 1 | **Canny** | Доски фич, голосование, public/private роадмап, custom scoring для приоритизации, интеграции (Slack, Intercom, Jira, Linear, Zapier…) | Сбор и приоритизация feature requests; growth-команды | Free (25 tracked users / 5 managers); Core от $19/мес (100 users, годовая), круто растёт: ~$311/мес при 1000, ~$656/мес при 5000 users ([Software Advice](https://www.softwareadvice.com/manufacturing/canny-profile/), [Produktly](https://produktly.com/pricing/canny)) |
| 2 | **Productboard** | RICE/WSJF фреймворки, feedback notes, objectives, teamspaces, публичные порталы | Зрелый product-management для средних/крупных; «maker»-модель | Free Starter; Essentials (1 maker, 250 notes); до $59/maker/мес Pro (годовая); contributors/viewers бесплатны ([CheckThat.ai](https://checkthat.ai/brands/productboard/pricing), [Featurebase](https://www.featurebase.app/blog/what-is-productboard)) |
| 3 | **Sleekplan** | Доски (public/private), голосование, статусы, роадмап (list/Kanban), changelog, CSAT/NPS; **Sleek Intelligence** — AI читает переписки/отзывы, извлекает запросы, авто-мёрджит дубли, авто-голосует; каналы: widget, in-app, email, **Slack**, Intercom | Полный feedback-loop для команд любого размера, AI-категоризация | Indie free (1 admin, 1 board, 25 tracked users); Starter $15/мес (3 admins); Business $45/мес (10 admins); Enterprise $63/мес ([Sleekplan](https://sleekplan.com/pricing/), [G2](https://www.g2.com/products/sleekplan/reviews)) |
| 4 | **Ducalis** ⚑ чат-нативный | Форвард сообщений **в бота из Telegram / Discord / Slack** (текст, voice, фото, видео), **AI переписывает** в структурную идею; богатые scoring-фреймворки; интеграции с Jira/Linear/Asana/ClickUp/Trello/GitHub | Прямой конкурент по «фидбэк из чатов»; value-based цена | Value-based (за impact, **не за seat**); очень щедрый free (unlimited); 14-дн trial Business ([Ducalis Telegram](https://hi.ducalis.io/customer-feedback-management/telegram-integration), [Ducalis Pricing](https://hi.ducalis.io/pricing)) |
| 5 | **Featurebase** ⚑ чат-нативный | Единый inbox: in-app + **Slack + Discord** + email; **`/featurebase` slash-команда** и save-message; доски, роадмапы, changelog, surveys; Fibi AI | Support + feedback в одном; стартапы | Free (1 seat, unified inbox, доски/роадмап/changelog); далее $29/$59/$99 per seat/мес; стартапам −86% ([Featurebase Pricing](https://www.featurebase.app/pricing)) |
| — | Savio / Olvy (упомянуты) | Savio: Slack **message-action «push to Savio»** (ручной выбор); Olvy: сбор из **Telegram-групп** | Нишевые сборщики из чатов | н/д ([Savio](https://www.savio.io/blog/tracking-feature-requests-from-slack/), [Olvy](https://olvy.co/integrations/telegram)) |

### SWOT в нашем контексте

**Что конкуренты делают лучше нас (угроза T для нас):**
- **Зрелость и полнота:** Sleekplan/Featurebase уже закрывают полный loop (доски, роадмап, changelog, surveys, AI-категоризация) — нам это ещё строить.
- **AI-извлечение из чатов уже есть:** Sleek Intelligence авто-извлекает и мёрджит дубли ([Sleekplan](https://sleekplan.com/)); Ducalis AI переписывает форварды в структурные идеи ([Ducalis](https://hi.ducalis.io/customer-feedback-management/telegram-integration)). **Это прямо наша заявленная фича-усилитель — она НЕ уникальна.**
- **Бесплатные/щедрые тиры:** Ducalis (unlimited free, не за seat) и Featurebase (free 1 seat с роадмапом) тяжело перебить по цене для инди ([Ducalis](https://hi.ducalis.io/pricing), [Featurebase](https://www.featurebase.app/pricing)).

**Что конкуренты делают хуже (возможность O для нас):**
- **Зрелые US-игроки игнорируют Telegram:** у Canny и Productboard **нет нативной Telegram-интеграции**, только через Zapier ([поиск интеграций](https://userjot.com/blog/canny-vs-productboard)). Telegram-сообщества (особенно EU/CIS/crypto/indie) — реальный белый пятно для топ-игроков.
- **Цена/сложность для малых:** Canny дорожает нелинейно по tracked users ([Produktly](https://produktly.com/pricing/canny)); Productboard тяжёл и заточен под средние/крупные команды ([Featurebase](https://www.featurebase.app/blog/what-is-productboard)).
- **«Виджет-first» ментальность:** Canny/Productboard/Sleekplan по-прежнему ждут структурированный ввод в доску/виджет; чат для них — вторичный канал-нотификация, а не первичный сбор.

> **Ревизия премисы брифа.** Тезис «в чаты маленьких команд конкуренты не лезут» —
> **частично неверен**: Ducalis, Featurebase, Savio, Olvy и AI Sleekplan уже собирают из чатов.
> **Истинная незанятая точка уже:** (а) **Telegram-first** + (б) связка **«чат → авто-группировка →
> приоритизация → роадмап»** в одном лёгком и дешёвом продукте для команд 3-15, без тяжести
> Productboard и без нелинейной цены Canny. Дифференциация смещается с «мы единственные в чатах»
> на «мы лучшие для малых команд именно в Telegram-чатах + полный цикл до роадмапа».

### Повторяющиеся UX-паттерны (негласный стандарт жанра)

Встречается у 2+ конкурентов — берём как baseline, не изобретаем:
- **Доска фич + голосование + статусы** (Canny, Sleekplan, Featurebase).
- **Роадмап с публичным/приватным режимом**, связанный с фидбэком (Canny, Sleekplan, Productboard).
- **Changelog / «ваша идея уехала в релиз»** (Sleekplan, Featurebase).
- **AI авто-группировка дублей** (Sleekplan, Ducalis) — уже стандарт, не киллер-фича.
- **Два паттерна захвата из чата:** (1) ручной выбор сообщения — message-action/slash-команда/форвард (Savio, Featurebase, Ducalis); (2) AI-скан канала (Sleekplan).

## 3. Целевые персоны

### Персона 1 — Марина, PM в SaaS-стартапе (главная)
- **Контекст:** команда 8 человек, веб-SaaS; фидбэк от юзеров в Telegram-комьюнити и Slack-канале поддержки; десктоп на работе, разбор по понедельникам.
- **Pain points:** теряет запросы в простыне Telegram; вручную копирует в Google Sheet; не может доказать команде, *почему* фича в топе; сотни сообщений в неделю не успевает разбирать.
- **Цель в продукте:** один источник правды + понятный приоритет, который можно показать команде.
- **Текущее решение:** Telegram + Google Sheets + память; пробовала Canny — «дорого и юзеры не идут в виджет».
- **Цитата:** «Фидбэк есть, но он размазан по чатам — я физически не успеваю его собрать, не то что приоритизировать».

### Персона 2 — Антон, инди-фаундер
- **Контекст:** соло, мобильное+веб приложение; Discord-сообщество 500 чел.; работает с телефона и ноута урывками.
- **Pain points:** нет времени на процессы; ценные идеи тонут в Discord; не хочет платить за seat-модель.
- **Цель:** за 5 минут выцепить из чата идею и положить в список «потом».
- **Текущее решение:** скриншоты, заметки, иногда форвард себе в избранное.
- **Цитата:** «Мне не нужен Productboard. Мне нужно не терять хорошие идеи из Discord».

### Персона 3 — Лена, customer success в небольшой команде (вторичная)
- **Контекст:** первой ловит боль юзеров в чатах поддержки; должна передать продакту.
- **Pain points:** передаёт фидбэк в личке/устно, он не доходит до приоритизации; нет петли обратной связи «что с моим репортом».
- **Цель:** одним кликом отправить сообщение в общий бэклог с тегом сегмента.
- **Текущее решение:** пересказ продакту, тред в Slack.
- **Цитата:** «Я говорю продакту, а через месяц забываю, дошло ли это куда-то».

> Персоны синтетические, построены по болям из сравнений/отзывов (источник 2) и логики брифа.

## 4. JTBD Map

| # | Job | Когда возникает | Что хочет получить | Текущее решение | Барьер |
|---|-----|-----------------|---------------------|-----------------|--------|
| JTBD-1 | Стянуть фидбэк из чата, не теряя | Сообщение-идея/жалоба прилетает в Telegram/Slack/Discord | Сохранить в единый бэклог за 1 действие | Ручное копирование в Sheets | Шум; нет быстрой точки входа |
| JTBD-2 | Не разбирать сотни сообщений руками | Накопилась пачка фидбэка за неделю | Видеть похожее сгруппированным | Глазами + память | Дубли; объём |
| JTBD-3 | Понять, за что браться | Планирование спринта/недели | Приоритизированный список + базовый роадмап | Интуиция, спор в чате | Нет прозрачного критерия приоритета |
| JTBD-4 | Привязать новый фидбэк к теме и видеть «вес» | Прилетел повторяющийся запрос | Линк к существующему пункту + счётчик частоты | Никак / вручную | Нет связи «сообщение↔тема» |
| JTBD-5 | Показать команде/юзерам, почему так | Возражение «почему не моя фича» | Прозрачный приоритет + публичный роадмап | Устное объяснение | Нет наглядной модели |
| JTBD-6 | Отделить фидбэк от болтовни | Постоянный поток в чате | Чтобы в бэклог попадало только релевантное | Ручной отсев | Нужен механизм фильтра |

> `ia-architect` ссылается на эти номера. JTBD-1, JTBD-3, JTBD-6 — ядро MVP.

## 5. Типовые сценарии использования

1. **«Понедельничный разбор» (Марина).** За неделю в Telegram/Slack накопилось ~80 сообщений.
   Открывает инструмент → видит входящие, уже сгруппированные по темам с счётчиком повторов →
   мёрджит пару дублей → проставляет приоритет по простому критерию → 5 пунктов уезжают в роадмап.
2. **«Поймал на лету» (Антон).** В Discord юзер кидает идею. Антон реагирует emoji/командой бота →
   сообщение падает в бэклог с автором и ссылкой. Возвращается к разбору вечером.
3. **«Передал дальше» (Лена).** В чате поддержки боль клиента. Лена message-action → отправляет в
   общий бэклог с тегом сегмента. Продакт видит это в приоритизации с указанием источника.

## 6. User journey high-level (черновой, детализирует ia-architect)

- **Triggered by:** фидбэк тонет в чатах, разбор отнимает часы, нет прозрачного приоритета.
- **Looking for:** один источник правды + быстрый захват из чата + приоритет, который не стыдно показать.
- **Process:** подключить чат (OAuth) → настроить точку входа (команда/emoji/форвард или AI-скан) →
  фидбэк стягивается и авто-группируется → разбор: мёрдж дублей, теги, приоритет →
  пункты в базовый роадмап → (опц.) публичный статус для юзеров.
- **Result:** перестал вести таблицы; команда видит, за что берётся и почему; юзеры видят прогресс.

## 7. Таблица фич с приоритетами

| # | Фича | Приоритет | Какой JTBD закрывает | Сложность |
|---|------|-----------|----------------------|-----------|
| 1 | Интеграция с чатом (OAuth) — **Telegram first**, затем Slack/Discord | must | JTBD-1 | high |
| 2 | Точка входа захвата: форвард-в-бота / команда / emoji-реакция | must | JTBD-1, JTBD-6 | medium |
| 3 | Единый бэклог входящих с автором, ссылкой, источником | must | JTBD-1, JTBD-4 | low |
| 4 | Авто-группировка похожих + мёрдж дублей (со счётчиком частоты) | must | JTBD-2, JTBD-4 | high |
| 5 | Приоритизация: lightweight (Value×Effort) + ручная корректировка | must | JTBD-3, JTBD-5 | medium |
| 6 | Базовый роадмап (статусы / Kanban-колонки) | must | JTBD-3, JTBD-5 | medium |
| 7 | Фильтр шума: правила (ключевые слова/реакция) ИЛИ AI-классификация | should | JTBD-6 | high |
| 8 | Теги сегментов/источника | should | JTBD-4, JTBD-5 | low |
| 9 | Публичный роадмап / changelog для юзеров | nice (v2) | JTBD-5 | medium |
| 10 | In-app виджет + email + формы (вынесено брифом в v2) | nice (v2) | JTBD-1 | high |
| 11 | RICE/полный scoring-фреймворк | nice | JTBD-3 | medium |

> `ia-architect` работает только с **must** (#1-6). Рекомендация по фильтру шума (#7): для MVP —
> **правила/ручной выбор**, AI-классификацию отложить (дорого, недетерминированно — см. §8 B2).

## 8. Ответы на открытые вопросы из брифа

| Вопрос из brief.md | Ответ | Источник |
|---------------------|-------|----------|
| **Модель приоритизации (B1)** | Зрелые: Productboard — RICE/WSJF; Canny — custom scoring + интеграция голосов; Sleekplan — голоса + AI авто-голос. **Но для команд 3-15 эксперты прямо рекомендуют lightweight (Value vs Effort, MoSCoW), консенсус через обсуждение, а не сложный скоринг.** → **Рекомендация: Value×Effort с ручной корректировкой в MVP, RICE как опция позже.** | [Productboard frameworks](https://www.productboard.com/glossary/product-prioritization-frameworks/), [Intercom RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/), [monday.com](https://monday.com/blog/rnd/product-prioritization-frameworks/) |
| **Отбор из шума (B2)** | Два рыночных паттерна: (1) **ручной выбор** — message-action (Savio), slash-команда (Featurebase), форвард-в-бота (Ducalis); (2) **AI авто-извлечение из канала** (Sleekplan Sleek Intelligence, Ducalis AI-рерайт). → **Рекомендация: MVP — ручной выбор/правила (детерминированно, дёшево, доверие), AI-скан — итерация 2.** | [Savio](https://www.savio.io/blog/tracking-feature-requests-from-slack/), [Featurebase](https://www.featurebase.app/), [Ducalis](https://hi.ducalis.io/customer-feedback-management/telegram-integration), [Sleekplan](https://sleekplan.com/) |
| **Точка входа в чате (B3)** | Подтверждены 4 паттерна: **форвард сообщения в бота** (Ducalis, Telegram), **slash-команда** (`/featurebase`), **message-action «push»** (Savio), **emoji-реакция/AI-скан** (Sleekplan). → **Рекомендация: для Telegram — форвард-в-бота (нативно для TG); для Slack/Discord — slash-команда + message-action/emoji.** | те же |
| **Масштаб на старте** | Конкуренты обслуживают весь спектр; брешь — именно **малые команды/инди**. → ориентир MVP: **малая команда (3-15) + инди**, не «несколько команд/мульти-продукт». | вывод из §2 |
| **Гипотеза монетизации** | Рынок: Sleekplan $15-45/мес flat по admins; Featurebase per-seat $29+; Ducalis **value-based, не per-seat**; Canny per-tracked-user (дорожает нелинейно). → для инди привлекательнее **flat / не per-seat** (Ducalis/Sleekplan как референс). | [Sleekplan](https://sleekplan.com/pricing/), [Featurebase](https://www.featurebase.app/pricing), [Ducalis](https://hi.ducalis.io/pricing) |

## 9. Что не удалось выяснить (передать в ia.md)

- **Качество AI авто-группировки в цифрах** (точность мёрджа дублей) — вендоры не раскрывают
  метрик; проверять на тестах/прототипе.
- **Реальный retention/switch-rate** конкурентов (наш ключевой fail-критерий) — публичных
  данных нет; меряем на своих тестах через `test-companion`.
- **Telegram API-ограничения для продуктового бота** (лимиты, бизнес-аккаунты, приватные группы) —
  требует технической проверки до фиксации скоупа интеграции (риск из брифа подтверждён).
- **Точная стоимость наших ближайших чат-нативных конкурентов** (Savio, Olvy) — прайс не публичен;
  при необходимости — прямой запрос/демо.
- **«Что входит в базовый роадмап MVP» (статусы/публичность)** — продуктовое решение, эскалировать
  заказчику на этапе IA.

---

### Sources
- [The Business Research Company — Feedback & Reviews Mgmt market](https://www.thebusinessresearchcompany.com/report/feedback-and-reviews-management-software-global-market-report)
- [Global Growth Insights — Customer Feedback Software market](https://www.globalgrowthinsights.com/market-reports/customer-feedback-software-market-124842)
- [Canny — Software Advice profile](https://www.softwareadvice.com/manufacturing/canny-profile/) · [Produktly — Canny pricing](https://produktly.com/pricing/canny) · [Canny prioritization blog](https://canny.io/blog/prioritization-feature-development-canny/)
- [Productboard — pricing (CheckThat.ai)](https://checkthat.ai/brands/productboard/pricing) · [Productboard frameworks](https://www.productboard.com/glossary/product-prioritization-frameworks/) · [Featurebase — what is Productboard](https://www.featurebase.app/blog/what-is-productboard)
- [Sleekplan — site](https://sleekplan.com/) · [Sleekplan — pricing](https://sleekplan.com/pricing/) · [Sleekplan — G2 reviews](https://www.g2.com/products/sleekplan/reviews)
- [Ducalis — Telegram integration](https://hi.ducalis.io/customer-feedback-management/telegram-integration) · [Ducalis — Discord](https://hi.ducalis.io/customer-feedback-management/discord-integration) · [Ducalis — pricing](https://hi.ducalis.io/pricing)
- [Featurebase — pricing](https://www.featurebase.app/pricing) · [Featurebase — platform](https://www.featurebase.app/)
- [Savio — feature requests from Slack](https://www.savio.io/blog/tracking-feature-requests-from-slack/)
- [Olvy — Telegram integration](https://olvy.co/integrations/telegram)
- [Intercom — RICE framework](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) · [monday.com — prioritization frameworks](https://monday.com/blog/rnd/product-prioritization-frameworks/)
- [UserJot — Canny vs Productboard (Telegram gap)](https://userjot.com/blog/canny-vs-productboard)
