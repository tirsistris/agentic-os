import type { RunStage } from "@/lib/run";
import ArtifactSection from "./ArtifactSection";

/**
 * Beat 3 — RunPlayer. Wraps the three stages (brief → research → ia) under a
 * single "the run" narrative beat. Each stage renders as an ArtifactSection.
 */
export default function RunPlayer({ stages }: { stages: RunStage[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Прогон
      </h2>
      <p className="mt-2 mb-10 max-w-xl text-zinc-600 dark:text-zinc-400">
        Три этапа подряд. Каждый артефакт передаётся следующему агенту как вход —
        ниже хайлайты, а полный текст раскрывается по клику.
      </p>

      <div className="flex flex-col gap-12">
        {stages.map((stage) => (
          <ArtifactSection key={stage.id} stage={stage} />
        ))}
      </div>
    </section>
  );
}
