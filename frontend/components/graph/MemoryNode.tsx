"use client";

import { Handle, Position } from "reactflow";
import { Brain } from "lucide-react";

import type {
  MemoryNodeProps,
} from "@/lib/types/graph";

export default function MemoryNode({
  data,
  selected,
}: MemoryNodeProps)  {  return (
    <div
      className={`
min-w-[250px]
rounded-2xl
bg-[#111827]
p-4
transition-all
duration-300
hover:scale-[1.02]
${selected ? "scale-105" : ""}
`} 
style={{
  border: `2px solid ${data.color}`,
  boxShadow: selected
    ? `0 0 35px ${data.color}55`
    : `0 0 12px ${data.color}22`,
}}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.color }}
      />

      <div className="flex items-center gap-3">
        <div
          className="rounded-full p-2"
          style={{
            backgroundColor: `${data.color}20`,
          }}
        >
          <Brain
            className="h-5 w-5"
            style={{
              color: data.color,
            }}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <h3 className="truncate text-sm font-semibold text-white">
            {data.title}
          </h3>

          <span
            className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: `${data.color}20`,
              color: data.color,
            }}
          >
            {data.type}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.color }}
      />
    </div>
  );
}