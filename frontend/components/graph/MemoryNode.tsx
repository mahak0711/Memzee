"use client";

import { Handle, Position } from "reactflow";
import { Brain } from "lucide-react";

export default function MemoryNode({ data }: any) {
  return (
    <div className="min-w-[220px] rounded-2xl border border-cyan-500/20 bg-[#111827]/90 p-4 shadow-xl backdrop-blur">

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-400"
      />

      <div className="flex items-center gap-3">

        <div className="rounded-full bg-cyan-500/10 p-2">
          <Brain className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {data.title}
          </h3>

          <p className="text-xs text-zinc-400">
            {data.type}
          </p>
        </div>

      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-300">
        {data.description}
      </p>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-400"
      />
    </div>
  );
}