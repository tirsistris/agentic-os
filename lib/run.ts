import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Data layer for the run showcase.
 *
 * Source of truth: the three artifacts the agent pipeline produced in
 * `content/run/`. We read the raw markdown for the <details> reveal, and pair
 * each stage with HAND-CURATED highlights (not auto-parsed headings) — picking
 * the points by hand is more honest about what actually matters in each doc.
 */

export type RunStage = {
  /** stable id, also used as anchor */
  id: "brief" | "research" | "ia" | "screens" | "prototype";
  /** which agent produced this artifact */
  agent: string;
  /** ordinal label shown in the player timeline */
  step: string;
  title: string;
  subtitle: string;
  /** hand-picked key takeaways */
  highlights: string[];
  /** agent contract — what it consumed, aimed at, was bound by, decided, changed */
  input: string;
  objective: string;
  constraints: string[];
  decisions: string[];
  change: string | null;
  /** full markdown of the artifact, rendered inside <details> */
  raw: string;
  /** small-print note shown at the top of the section, if this stage needs one */
  disclaimer?: string;
  /** screenshots grid, if this stage produced visual artifacts */
  images?: { src: string; alt: string }[];
  /** external CTA, if this stage links out to a live artifact */
  externalCta?: { href: string; label: string };
};

export type HonestMoment = {
  /** the three narrative beats of the course-correction */
  assumption: string;
  discovery: string;
  correction: string;
  caption: string;
};

export type Run = {
  stages: RunStage[];
  honestMoment: HonestMoment;
  openQuestions: string[];
};

const RUN_DIR = path.join(process.cwd(), "content", "run");

async function readArtifact(file: string): Promise<string> {
  return readFile(path.join(RUN_DIR, file), "utf8");
}

/**
 * Hand-curated highlights per stage. Deliberately authored, not extracted —
 * the premise-revision points live in the HonestMoment beat, not here, so the
 * climax isn't diluted inside the research highlights.
 */
const CURATED: Record<RunStage["id"], Omit<RunStage, "raw">> = {
  screens: {
    id: "screens",
    agent: "design-generator",
    step: "04",
    title: "Screens",
    subtitle: "Ключевые экраны",
    highlights: [
      "Inbox закрывает JTBD-1 «стянуть фидбэк, не теряя»: главное действие строки — «Принять», по шагам 2–4 главного флоу из IA.",
      "Сквозной сценарий: сообщение @nastya_dev из Inbox прослеживается в группу «Экспорт данных ×2» и в карточку In Progress на роадмапе.",
      "Backlog — split-view: два под-узла sitemap собраны в один экран; расхождение с ia.md зафиксировано заметкой, вход не правился.",
      "Канбан ровно из 3 колонок — допущение D1 унаследовано без «улучшений», OQ-1 не закрыт втихую.",
      "Документный проход: Figma-поля контракта помечены «не применимо», реконструированный контент отделён от фактов ресёрча.",
    ],
    input: "ia.md (контекст: brief.md, research.md)",
    objective:
      "специфицировать ключевые экраны главного флоу + 1 edge case, закрывающие JTBD-1…6",
    constraints: [
      "ровно 4 экрана",
      "допущения D1/D2 наследуются как есть",
      "входы read-only",
      "платформа однозначно из брифа (desktop web 1440×900)",
      "документный проход без Figma",
    ],
    decisions: [
      "split-view для Backlog",
      "«Принять» как main CTA строки Inbox",
      "состояние «в роадмапе»",
      "layout-паттерны F / inverted pyramid по типу контента",
    ],
    change:
      "Backlog: два под-узла sitemap объединены в один split-view экран; расхождение зафиксировано, ia.md не правился",
    disclaimer:
      "Этапы 01–03 — исходный прогон. Этап 04 выполнен продолжением на тех же входных артефактах, без их правки.",
    images: [
      {
        src: "/run/screens/01-inbox.png",
        alt: "Inbox: список входящего фидбэка с действиями Принять/Отклонить",
      },
      {
        src: "/run/screens/01-inbox-empty.png",
        alt: "Inbox, empty state: CTA Подключить Telegram",
      },
      {
        src: "/run/screens/02-backlog.png",
        alt: "Backlog: группы фидбэка и матрица Value×Effort",
      },
      {
        src: "/run/screens/03-roadmap.png",
        alt: "Roadmap: канбан из трёх колонок",
      },
    ],
  },
  prototype: {
    id: "prototype",
    agent: "prototype-builder",
    step: "05",
    title: "Prototype",
    subtitle: "Карта переходов",
    highlights: [
      "8 связей: 2 main flow + 4 sidebar-навигации + 2 задокументированных in-place-действия без перехода.",
      "Переходы «Принять» и «Добавить в роадмап» помечены как прототипная конвенция: в продукте действие in-place, переход добавлен, чтобы сценарий игрался одним путём.",
      "6 переходов за границей прототипа (Settings, Login, onboarding) зафиксированы, а не выдуманы.",
      "Animation = Instant: единый persistent shell — desktop tab-switch, не push-стек.",
      "Документный проход: Figma-connections не создавались, поля помечены «не применимо».",
    ],
    input: "screens.md (контекст: ia.md)",
    objective: "карта переходов и навигации между экранами прогона",
    constraints: [
      "только 4 существующих экрана",
      "переходы на несобранные экраны фиксировать как «за границей прототипа», не выдумывать",
      "входы read-only",
      "документный проход без Figma",
    ],
    decisions: [
      "Instant для persistent shell (desktop tab-switch)",
      "прототипная конвенция для CTA-переходов с явной пометкой",
      "служебная панель просмотрщика в веб-сборке как мета-слой, не UI продукта",
    ],
    change: null,
    disclaimer:
      "Этап 05 выполнен продолжением на тех же входных артефактах, без их правки.",
    externalCta: {
      href: "https://feedback-roadmap-proto.vercel.app",
      label: "живой прототип ↗",
    },
  },
  brief: {
    id: "brief",
    agent: "brief-expander",
    step: "01",
    title: "Brief",
    subtitle: "Продукт и проблема",
    highlights: [
      "Инструмент для команд 3-15 и инди: собрать фидбэк из чатов и превратить в приоритизированный роадмап.",
      "Ставка — Telegram-first как точка входа + ясная приоритизация (хаос → «что делать на этой неделе»).",
      "Скоуп MVP узкий и осознанный: только чаты/мессенджеры, 1-2 месяца; in-app/email/звонки — в v2.",
      "Главная метрика — switch-сигнал: команды возвращаются и ведут разбор ≥2 недель подряд.",
      "Fail-критерий: команды продолжают параллельно вести фидбэк в Google Sheets.",
    ],
    input:
      "Сырой запрос продукта свободной формой (1–3 строки от стейкхолдера/PM, без спеки). Сам сид-запрос не сохранён как артефакт.",
    objective:
      "Развернуть сырой запрос в структурированный бриф через раунды уточняющих вопросов: аудитория → ограничения → цели → fail-критерии.",
    constraints: [
      "Не дополнять запрос своими допущениями; не выдумывать ответы за пользователя",
      "≤ 4 раундов, ≤ 6 вопросов за раунд; неизвестное — в «Открытые вопросы»",
      "Узкий скоуп MVP получен как constraint: только чаты/мессенджеры; in-app/email/звонки → v2; Google Sheets не интегрируем",
    ],
    decisions: [
      "Решения процессные/структурные: что пометить открытым vs закрытым, как разложить размытый вход в формат",
      "Продуктовое содержание (скоуп, метрики, fail-критерии) выявлено у заказчика, не авторствовано агентом",
    ],
    change: null,
  },
  research: {
    id: "research",
    agent: "researcher",
    step: "02",
    title: "Research",
    subtitle: "Рынок, конкуренты, персоны",
    highlights: [
      "Рынок Feedback & Reviews Mgmt: $16.7 млрд (2025) → $19.6 млрд (2026), CAGR ~17%.",
      "Canny и Productboard не имеют нативной Telegram-интеграции — только через Zapier.",
      "Для команд 3-15 эксперты рекомендуют lightweight Value×Effort, а не тяжёлый RICE/WSJF.",
      "Захват из чата — отраслевой стандарт: форвард-в-бота (Telegram), slash-команда и message-action (Slack/Discord).",
      "Три синтетические персоны: Марина (PM), Антон (инди-фаундер), Лена (customer success).",
    ],
    input:
      "brief.md целиком, особенно секция «Открытые вопросы» — то, что нужно закрыть.",
    objective:
      "Продуктовый ресёрч: карта вопросов, конкуренты по иерархии источников, синтетические персоны, JTBD-карта, сценарии, high-level journey, приоритизированная таблица фич.",
    constraints: [
      "Иерархия источников: офиц. сайты → отзывы → аналитика → блоги/форумы фоном",
      "Каждая цифра — со ссылкой; без ссылки — пометка «оценка»; не выдумывать конкретику",
      "JTBD строго отдельной секцией; SWOT только «в нашем контексте»; детальный flow не дублировать",
    ],
    decisions: [
      "Рекомендации (приняты дальше по пайплайну): Value×Effort вместо RICE для команд 3–15; фильтр шума в MVP — правила/ручной выбор, AI → v2; точка входа Telegram — форвард-в-бота",
    ],
    change:
      "Премиса брифа о «незанятой точке» признана частично неверной — чат-нативных сборщиков уже несколько (Ducalis, Featurebase, Savio, Olvy, Sleekplan AI). Дифференциация смещена с «мы единственные в чатах» на «лучшие для малых команд именно в Telegram + полный цикл до роадмапа». Источник: research.md §2.",
  },
  ia: {
    id: "ia",
    agent: "ia-architect",
    step: "03",
    title: "Information Architecture",
    subtitle: "Экраны, флоу, edge-кейсы",
    highlights: [
      "Главный экран — Inbox: закрывает ядерный JTBD-1 «стянуть фидбэк, не теряя».",
      "Sitemap: Inbox → Backlog (группы + Value×Effort) → Roadmap (Kanban) → Settings.",
      "Главный флоу — «понедельничный разбор»: 10 шагов от входящих до карточки в роадмапе.",
      "Три edge-кейса проработаны: empty state, error state, first-time vs returning.",
      "Допущение D1: минимальный Kanban из трёх колонок — To Do / In Progress / Done.",
    ],
    input:
      "brief.md + research.md, особенно §4 JTBD-карта и §7 таблица фич.",
    objective:
      "Построить информационную архитектуру: JTBD → минимально необходимые экраны, главный экран по чётким критериям, главный flow + 3 edge-кейса, sitemap ≤2 уровней, диаграммы в FigJam.",
    constraints: [
      "Работать только с must-фичами; sitemap не глубже 2 уровней",
      "User flow — строго таблицей (её читает prototype-builder)",
      "Не выдумывать экраны под не-must фичи; не пропускать edge-кейсы; главное действие = глагол+объект",
    ],
    decisions: [
      "Главный экран — Inbox (выиграл по всем 3 критериям, обосновано)",
      "Главный сценарий — «понедельничный разбор», 10 шагов",
      "Честно помеченные допущения: D1 (Kanban 3 колонки, «требует подтверждения заказчика»), D2 (один workspace), D3 (email+пароль / Google OAuth)",
    ],
    change: null,
  },
};

let cached: Run | null = null;

export async function getRun(): Promise<Run> {
  if (cached) return cached;

  const [brief, research, ia, screens, prototype] = await Promise.all([
    readArtifact("brief.md"),
    readArtifact("research.md"),
    readArtifact("ia.md"),
    readArtifact("screens.md"),
    readArtifact("prototype.md"),
  ]);

  const rawById: Record<RunStage["id"], string> = {
    brief,
    research,
    ia,
    screens,
    prototype,
  };

  const stages: RunStage[] = (
    ["brief", "research", "ia", "screens", "prototype"] as const
  ).map((id) => ({ ...CURATED[id], raw: rawById[id] }));

  cached = {
    stages,
    honestMoment: {
      assumption:
        "Исходная гипотеза делала ставку на сбор фидбэка из чатов как на относительно свободное пространство.",
      discovery:
        "Ресёрч проверил это и пометил премису „незанятой точки“ как частично неверную: чат-нативных сборщиков уже несколько — Ducalis, Featurebase, Savio, Olvy, Sleekplan AI.",
      correction:
        "Дифференциация сместилась со „сбора из чатов“ на „Telegram-first + полный цикл до роадмапа для малых команд“ — и эта правка уже видна в финальном брифе и его рисках.",
      caption: "реплей реального прогона",
    },
    openQuestions: [
      "Точный набор статусов и колонок роадмапа (D1 — пока допущение).",
      "Нужна ли публичная страница роадмапа в MVP или строго v2.",
      "Telegram API-ограничения для продуктового бота в приватных группах.",
      "Гипотеза монетизации и финальный нейминг продукта.",
    ],
  };

  return cached;
}
