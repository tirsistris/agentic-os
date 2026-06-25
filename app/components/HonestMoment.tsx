import type { HonestMoment as HonestMomentData } from "@/lib/run";

/**
 * Beat 4 — HonestMoment. The climax: the run revised its own premise.
 * Inverts the dark showcase into a single light, paper-cream frame set in
 * Source Serif 4 — a different voice for the one honest beat. The three takts
 * progress assumption (faded) → discovery (left accent bar, full strength) →
 * correction (full strength). Colors are fixed (no theme variant): this band is
 * meant to read as light regardless of the surrounding dark sections.
 */
export default function HonestMoment({ data }: { data: HonestMomentData }) {
  const beats = [
    {
      label: "Предположение",
      text: data.assumption,
      // washed-out ink, faint rule — the premise before it cracked
      tone: "border-l border-[#d8d1c3] text-[#9a917f]",
    },
    {
      label: "Открытие",
      text: data.discovery,
      // accent bar at full strength — the moment the run found the evidence
      tone: "border-l-2 border-[#4f46e5] text-[#221e18]",
    },
    {
      label: "Коррекция",
      text: data.correction,
      tone: "border-l border-[#cabfa8] text-[#221e18]",
    },
  ];

  return (
    <section className="bg-[#ece6db] text-[#221e18]">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:py-28">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4f46e5]/30 px-3 py-1 text-xs font-medium tracking-wide text-[#4f46e5] uppercase">
          <span aria-hidden>✦</span>
          {data.caption}
        </span>

        <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-[#1c1813] sm:text-5xl">
          Честный момент
        </h2>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-[#5e564a]">
          Прогон не подтвердил исходную гипотезу — он её опроверг и пересобрал
          позиционирование. Это записано как есть.
        </p>

        <ol className="mt-12 space-y-8">
          {beats.map((b) => (
            <li key={b.label} className={`pl-6 ${b.tone}`}>
              <p className="text-xs font-medium tracking-wide text-[#8c8472] uppercase">
                {b.label}
              </p>
              <p className="mt-2 font-serif text-xl leading-relaxed sm:text-2xl">
                {b.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
