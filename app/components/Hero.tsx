/**
 * Beat 1 — Hero. Entry point: what this is and what the run produced.
 */
export default function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-20 sm:py-28">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300 uppercase">
        Agentic OS · реплей прогона
      </span>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 hyphens-auto break-words sm:text-5xl">
        От фидбэка в чатах — к приоритизированному роадмапу
      </h1>
      <p className="max-w-xl text-lg leading-8 text-zinc-400">
        Один прогон агентного пайплайна: бриф разворачивается в ресёрч, ресёрч —
        в информационную архитектуру. Ниже — система, сами артефакты и момент,
        где прогон честно скорректировал сам себя.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
        <span>3 артефакта</span>
        <span aria-hidden>·</span>
        <span>6 агентов + оркестратор</span>
        <span aria-hidden>·</span>
        <span>контракт brief → research → ia → screens</span>
      </div>
    </section>
  );
}
