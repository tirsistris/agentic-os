import { Fragment } from "react";

/**
 * Beat 2 — SystemMap. A vertical backbone (spine), not a grid: the orchestrator
 * node sits at the top of a connecting line, and the six agents run as full-width
 * rows down the spine — each row pairs the agent's mono name (left) with the
 * artifact chip it produces (right). The data contract closes the section as a
 * compact pill chain. Dark, to match the showcase. No SVG libs — the spine is a
 * single absolutely-positioned rule with opaque node dots punched over it.
 */

const MAIN_CHAIN = [
  { id: "brief",     name: "brief-expander",    produces: "brief",     executed: true  },
  { id: "research",  name: "researcher",        produces: "research",  executed: true  },
  { id: "ia",        name: "ia-architect",      produces: "ia",        executed: true  },
  { id: "design",    name: "design-generator",  produces: "screens",   executed: false },
  { id: "prototype", name: "prototype-builder", produces: "prototype", executed: false },
];

const PARALLEL = [
  { id: "test", name: "test-companion", produces: "тест-стенд", executed: false },
];

const CONTRACT = ["brief", "research", "ia", "screens"];

export default function SystemMap() {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <span aria-hidden className="block h-px w-10 bg-[#3b82f6]" />
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Система
        </h2>
        <p className="mt-4 max-w-md text-zinc-400">
          Оркестратор координирует шесть специализированных агентов. Каждый
          передаёт следующему типизированный артефакт.
        </p>

        {/* Backbone / spine */}
        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-[7px] w-px bg-zinc-800"
          />
          <ol className="space-y-3">
            {/* Orchestrator node */}
            <li className="relative pl-9">
              <span
                aria-hidden
                className="absolute top-1/2 left-0 size-3.5 -translate-y-1/2 rounded-full border-2 border-[#4f6bff] bg-[#0a0a0a]"
              />
              <div className="inline-flex flex-col rounded-lg border border-[#4f6bff]/50 bg-[#4f6bff]/[0.06] px-4 py-2.5">
                <span className="text-[10px] font-medium tracking-[0.15em] text-[#7e8cff] uppercase">
                  Координатор
                </span>
                <span className="mt-0.5 font-mono text-sm text-white">
                  orchestrator
                </span>
              </div>
            </li>

            {/* Agent rows — main chain only */}
            {MAIN_CHAIN.map((a) => (
              <li key={a.id} className="relative pl-9">
                <span
                  aria-hidden
                  className={`absolute top-[26px] left-[2px] size-2.5 -translate-y-1/2 rounded-full border bg-[#0a0a0a] ${
                    a.executed ? "border-zinc-600" : "border-zinc-800"
                  }`}
                />
                <div
                  className={`flex items-center justify-between gap-3 rounded-lg border bg-zinc-900/40 px-4 py-3 ${
                    a.executed ? "border-zinc-800" : "border-zinc-800/60"
                  }`}
                >
                  <span
                    className={`font-mono text-sm ${
                      a.executed ? "text-zinc-100" : "text-zinc-600"
                    }`}
                  >
                    {a.name}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 font-mono text-xs ${
                      a.executed
                        ? "border-zinc-700 bg-zinc-800/60 text-zinc-300"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-600"
                    }`}
                  >
                    <span aria-hidden>→</span> {a.produces}
                  </span>
                </div>
                {!a.executed && (
                  <p className="mt-1 pl-1 text-[10px] text-zinc-600">
                    не выполнен в этом прогоне
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Parallel branch — test-companion, off the spine */}
        <div className="mt-6 ml-9 border-t border-zinc-800/60 pt-6">
          <p className="text-[10px] font-medium tracking-[0.15em] text-zinc-600 uppercase">
            параллельно · старт после brief
          </p>
          {PARALLEL.map((a) => (
            <div
              key={a.id}
              className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-4 py-3"
            >
              <span className="font-mono text-sm text-zinc-600">{a.name}</span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1 font-mono text-xs text-zinc-600">
                <span aria-hidden>→</span> {a.produces}
              </span>
            </div>
          ))}
        </div>

        {/* Data contract */}
        <div className="mt-14 border-t border-zinc-800 pt-8">
          <p className="text-[11px] font-medium tracking-[0.15em] text-zinc-500 uppercase">
            Контракт данных
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CONTRACT.map((node, i) => {
              const dim = node === "screens";
              return (
                <Fragment key={node}>
                  <span
                    className={`rounded-md border px-3 py-1.5 font-mono text-xs ${
                      dim
                        ? "border-zinc-800 text-zinc-600"
                        : "border-zinc-700 bg-zinc-900 text-zinc-200"
                    }`}
                  >
                    {node}
                  </span>
                  {i < CONTRACT.length - 1 && (
                    <span aria-hidden className="font-mono text-zinc-600">
                      →
                    </span>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
