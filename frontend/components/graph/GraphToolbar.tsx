"use client";

import {
  RotateCcw,
  Maximize2,
  GitBranch,
  PanelLeftClose,
  PanelRightClose,
  Camera,
  Play,
} from "lucide-react";

import SearchBar from "./SearchBar";
import { useUIStore } from "@/lib/store/ui";

type Props = {
  nodeCount: number;
  edgeCount: number;
  nodes: any[];
  onImportYoutube: () => void;
  onSelect: (node: any) => void;
  onReset: () => void;
  onFit: () => void;
  onImport: () => void;
  onCapture: () => void;
};

export default function GraphToolbar({
  nodeCount,
  edgeCount,
  nodes,
  onSelect,
  onReset,
  onFit,
  onImport,
  onImportYoutube,
  onCapture,
}: Props) {
  const timelineOpen = useUIStore((s) => s.timelineOpen);
  const inspectorOpen = useUIStore((s) => s.inspectorOpen);
  const toggleTimeline = useUIStore((s) => s.toggleTimeline);
  const toggleInspector = useUIStore((s) => s.toggleInspector);

  return (
    <div className="absolute left-6 top-6 z-50 flex w-[420px] flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
          Knowledge Graph
        </h2>
        <div className="flex items-center gap-2 text-[10px] font-mono font-medium tracking-wider text-zinc-400 uppercase">
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 border border-white/5">
            {nodeCount} Nodes
          </span>
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 border border-white/5">
            {edgeCount} Edges
          </span>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full">
        <SearchBar nodes={nodes} onSelect={onSelect} />
      </div>

      {/* Primary Actions (Data Import) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onImport}
          className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500 hover:text-cyan-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
        >
          <GitBranch size={16} strokeWidth={2.5} className="transition-transform group-hover:-rotate-12" />
          Import Repo
        </button>

        <button
          onClick={onImportYoutube}
          className="group flex items-center justify-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-sm font-semibold text-rose-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95"
        >
          <Play size={16} strokeWidth={2.5} className="transition-transform group-hover:scale-110" />
          YouTube
        </button>
      </div>

      {/* Secondary Controls (Canvas & UI) */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
        
        {/* Graph Canvas Controls */}
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
          <div className="mx-1 h-4 w-px bg-zinc-800" />
          <button
            onClick={onCapture}
            title="Capture Graph"
            className="rounded-lg p-1.5 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
          >
            <Camera size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Panel Toggle Controls */}
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
    </div>
  );
}