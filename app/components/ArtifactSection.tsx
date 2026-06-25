import type { RunStage } from "@/lib/run";
import Markdown from "./Markdown";

/**
 * One stage of the run: hand-curated highlights always visible, full markdown
 * artifact tucked into a native <details> (keyboard-accessible, no hydration).
 * Reused by all three stages inside RunPlayer. Unconditionally dark.
 */
export default function ArtifactSection({ stage }: { stage: RunStage }) {
  return (
    <article
      id={stage.id}
      className="border-l-2 border-zinc-800 pl-5 sm:pl-8"
    >
      <header className="mb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-zinc-500">
            {stage.step}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
            {stage.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          {stage.subtitle} ·{" "}
          <span className="font-mono">{stage.agent}</span>
        </p>
      </header>

      <ul className="space-y-2">
        {stage.highlights.map((h, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-[15px] leading-7 text-zinc-300"
          >
            <span
              aria-hidden
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600"
            />
            {h}
          </li>
        ))}
      </ul>

      <details className="group mt-5 rounded-lg border border-zinc-800">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-zinc-400 select-none hover:text-zinc-100">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block text-base leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
            Полный артефакт
          </span>
        </summary>
        <div className="border-t border-zinc-800 px-4 py-2">
          <Markdown>{stage.raw}</Markdown>
        </div>
      </details>
    </article>
  );
}
