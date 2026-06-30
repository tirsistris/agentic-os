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
  id: "brief" | "research" | "ia";
  /** which agent produced this artifact */
  agent: string;
  /** ordinal label shown in the player timeline */
  step: string;
  title: string;
  subtitle: string;
  /** hand-picked key takeaways */
  highlights: string[];
  /** full markdown of the artifact, rendered inside <details> */
  raw: string;
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
  },
};

let cached: Run | null = null;

export async function getRun(): Promise<Run> {
  if (cached) return cached;

  const [brief, research, ia] = await Promise.all([
    readArtifact("brief.md"),
    readArtifact("research.md"),
    readArtifact("ia.md"),
  ]);

  const rawById: Record<RunStage["id"], string> = { brief, research, ia };

  const stages: RunStage[] = (["brief", "research", "ia"] as const).map(
    (id) => ({ ...CURATED[id], raw: rawById[id] }),
  );

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
