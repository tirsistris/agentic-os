/**
 * Beat 5 — Provenance. The takeaway: the same pipeline produced a real design
 * system for TripSplit. Open questions are kept small and secondary.
 */
export default function Provenance({
  openQuestions,
}: {
  openQuestions: string[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Провенанс
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        Этим же пайплайном собрана дизайн-система для{" "}
        <a
          href="https://baatr.vercel.app/cases/tripsplit"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-500 dark:text-blue-400"
        >
          TripSplit
        </a>
        . Тот же оркестратор, те же контракты между агентами — другой продукт.
      </p>

      <a
        href="https://baatr.vercel.app/cases/tripsplit"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Кейс TripSplit →
      </a>

      <div className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h3 className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Открытые вопросы прогона
        </h3>
        <ul className="mt-3 space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {openQuestions.map((q, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden>—</span>
              {q}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
