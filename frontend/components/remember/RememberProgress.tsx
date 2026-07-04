"use client";

import { Brain, Database, Network, CheckCircle2 } from "lucide-react";

const ICONS = {
  extract: Brain,
  graph: Network,
  save: Database,
  done: CheckCircle2,
};

export default function RememberProgress({
  step,
}: {
  step: "extract" | "graph" | "save" | "done";
}) {
  const titles = {
    extract: "Extracting entities...",
    graph: "Building knowledge graph...",
    save: "Saving memory...",
    done: "Memory stored successfully!",
  };

  const Icon = ICONS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">

      <div className="w-[420px] rounded-3xl border border-white/10 bg-[#09090b] p-8">

        <div className="flex flex-col items-center">

          <div className="mb-6 rounded-full bg-cyan-500/10 p-5">

            <Icon
              className={`h-10 w-10 text-cyan-400 ${
                step !== "done" ? "animate-pulse" : ""
              }`}
            />

          </div>

          <h2 className="text-xl font-semibold text-white">
            {titles[step]}
          </h2>

          {step !== "done" && (
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-zinc-800">

              <div className="h-full w-full animate-pulse rounded-full bg-cyan-500" />

            </div>
          )}

        </div>

      </div>

    </div>
  );
}