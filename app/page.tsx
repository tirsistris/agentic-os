import type { Metadata } from "next";
import { getRun } from "@/lib/run";
import Hero from "@/app/components/Hero";
import SystemMap from "@/app/components/SystemMap";
import RunPlayer from "@/app/components/RunPlayer";
import HonestMoment from "@/app/components/HonestMoment";
import Provenance from "@/app/components/Provenance";

export const metadata: Metadata = {
  title: "Реплей прогона — Feedback→Roadmap",
  description:
    "Один прогон агентного пайплайна: бриф → ресёрч → информационная архитектура, с честной коррекцией позиционирования.",
};

export default async function Home() {
  const run = await getRun();

  return (
    <main className="w-full">
      {/* Beat 1 */}
      <Hero />
      {/* Beat 2 */}
      <SystemMap stages={run.stages} />
      {/* Beat 3 */}
      <RunPlayer stages={run.stages} />
      {/* Beat 4 */}
      <HonestMoment data={run.honestMoment} />
      {/* Beat 5 */}
      <Provenance openQuestions={run.openQuestions} />
    </main>
  );
}
