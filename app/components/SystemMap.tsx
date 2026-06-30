"use client";

import { Fragment, useState } from "react";
import type { RunStage } from "@/lib/run";

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

export default function SystemMap({ stages }: { stages: RunStage[] }) {
  const [mode, setMode] = useState<"showcase" | "xray">("showcase");
  const [openId, setOpenId] = useState<string | null>(null);

  function selectMode(m: "showcase" | "xray") {
    setMode(m);
    if (m === "showcase") setOpenId(null); // контракт не остаётся открытым в showcase
  }

  return (
    <section id="system" className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <span aria-hidden className="block h-px w-10 bg-[#3b82f6]" />
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Система
        </h2>
        <p className="mt-4 max-w-md text-zinc-400">
          Оркестратор координирует шесть специализированных агентов. Каждый
          передаёт следующему типизированный артефакт.
        </p>

        {/* Mode toggle — Showcase | X-Ray */}
        <div
          role="tablist"
          aria-label="Режим карты"
          className="mt-8 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/40 p-1"
        >
          {(["showcase", "xray"] as const).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectMode(m)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  active
                    ? "bg-[#4f6bff]/[0.12] text-[#7e8cff]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "showcase" ? "Showcase" : "X-Ray"}
              </button>
            );
          })}
        </div>

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
            {MAIN_CHAIN.map((a) => {
              const clickable = a.executed && mode === "xray";
              const open = clickable && openId === a.id;
              const c = open ? stages.find((s) => s.id === a.id) : undefined;

              // existing row card — markup unchanged, just extracted
              const card = (
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
              );

              return (
                <li key={a.id} className="relative pl-9">
                  <span
                    aria-hidden
                    className={`absolute top-[26px] left-[2px] size-2.5 -translate-y-1/2 rounded-full border bg-[#0a0a0a] ${
                      a.executed ? "border-zinc-600" : "border-zinc-800"
                    }`}
                  />

                  {clickable ? (
                    <button
                      type="button"
                      aria-expanded={openId === a.id}
                      aria-controls={`contract-${a.id}`}
                      onClick={() => setOpenId(openId === a.id ? null : a.id)}
                      className="block w-full text-left"
                    >
                      {card}
                    </button>
                  ) : (
                    card
                  )}

                  {!a.executed && (
                    <p className="mt-1 pl-1 text-[10px] text-zinc-600">
                      не выполнен в этом прогоне
                    </p>
                  )}

                  {open && c && (
                    <div
                      id={`contract-${a.id}`}
                      className="mt-2 space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4"
                    >
                      <div>
                        <p className="text-[10px] font-medium tracking-[0.15em] text-zinc-600 uppercase">
                          Input
                        </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-300">
                          {c.input}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-medium tracking-[0.15em] text-zinc-600 uppercase">
                          Objective
                        </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-300">
                          {c.objective}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-medium tracking-[0.15em] text-zinc-600 uppercase">
                          Constraints
                        </p>
                        <ul className="mt-1 space-y-1">
                          {c.constraints.map((x, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm leading-6 text-zinc-300"
                            >
                              <span
                                aria-hidden
                                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600"
                              />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] text-zinc-400 uppercase">
                          <span aria-hidden className="text-[8px] text-zinc-400">
                            ◆
                          </span>
                          Decision
                        </p>
                        <ul className="mt-1 space-y-1">
                          {c.decisions.map((x, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm leading-6 text-zinc-300"
                            >
                              <span
                                aria-hidden
                                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600"
                              />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {c.change !== null && (
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.15em] text-[#7e8cff] uppercase">
                            Change
                          </p>
                          <p className="mt-1 text-sm leading-6 text-zinc-300">
                            {c.change}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-[10px] font-medium tracking-[0.15em] text-zinc-600 uppercase">
                          Output
                        </p>
                        <a
                          href={`#${a.id}`}
                          className="mt-1 inline-block font-mono text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-200"
                        >
                          ↓ артефакт в Прогоне
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
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
