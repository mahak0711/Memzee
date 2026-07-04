"use client";

import {
  RotateCcw,
  Maximize2,
  GitBranch,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

import SearchBar from "./SearchBar";
import { useUIStore } from "@/lib/store/ui";

type Props = {
  nodeCount: number;
  edgeCount: number;
  nodes: any[];
  onSelect: (node: any) => void;
  onReset: () => void;
  onFit: () => void;
  onImport: () => void;
};

export default function GraphToolbar({
  nodeCount,
  edgeCount,
  nodes,
  onSelect,
  onReset,
  onFit,
  onImport,
}: Props) {
  const timelineOpen = useUIStore((s) => s.timelineOpen);
  const inspectorOpen = useUIStore((s) => s.inspectorOpen);

  const toggleTimeline = useUIStore((s) => s.toggleTimeline);
  const toggleInspector = useUIStore((s) => s.toggleInspector);

  return (
    <div className="absolute left-6 top-6 z-50 w-[420px] rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
      
      {/* Header Section - Compacted to prevent blocking the graph */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
            Knowledge Graph
          </h2>
          <span className="text-[10px] font-mono font-medium tracking-wider text-zinc-500 uppercase">
            {nodeCount} Nodes • {edgeCount} Edges
          </span>
        </div>

        <SearchBar nodes={nodes} onSelect={onSelect} />
      </div>

      {/* Controls Section */}
      <div className="flex items-center justify-between rounded-b-2xl border-t border-zinc-800/50 bg-zinc-900/30 px-4 py-3">
        
        <div className="flex items-center gap-2">
          {/* Graph Action Group */}
          <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-black/40 p-1">
            <button
              onClick={onReset}
              title="Reset View"
              className="rounded-lg p-1.5 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
            >
              <RotateCcw size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={onFit}
              title="Fit View"
              className="rounded-lg p-1.5 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
            >
              <Maximize2 size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Panel Toggle Group */}
          <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-black/40 p-1">
            <button
              onClick={toggleTimeline}
              title="Toggle Timeline"
              className={`rounded-lg p-1.5 transition-all active:scale-95 ${
                timelineOpen
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <PanelLeftClose size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={toggleInspector}
              title="Toggle Inspector"
              className={`rounded-lg p-1.5 transition-all active:scale-95 ${
                inspectorOpen
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <PanelRightClose size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Primary Action */}
        <button
          onClick={onImport}
          className="group flex items-center gap-2 rounded-xl bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-cyan-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
        >
          <GitBranch size={16} strokeWidth={2.5} className="transition-transform group-hover:-rotate-12" />
          Import Repo
        </button>
        
      </div>
    </div>
  );
}