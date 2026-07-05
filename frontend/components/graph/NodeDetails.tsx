"use client";

import { X } from "lucide-react";

export default function NodeDetails({
  node,
  nodes,
  edges,
  onClose,
}: {
  node: any;
  nodes: any[];
  edges: any[];
  onClose: () => void;
}) {
  if (!node) return null;
const relatedEdges = edges.filter(
  (edge) =>
    edge.source === node.id ||
    edge.target === node.id
);

const relatedNodes = relatedEdges.map((edge) => {
  const otherId =
    edge.source === node.id
      ? edge.target
      : edge.source;

  return nodes.find((n) => n.id === otherId);
});



  return (
    <aside className="absolute right-4 top-4 z-50 w-80 rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {node.data.title}
        </h2>

        <button onClick={onClose}>
          <X className="text-zinc-400 hover:text-white" />
        </button>
      </div>

      <div className="space-y-4">

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Category
          </p>

          <p className="mt-1 text-white">
            {node.data.type}
          </p>
        </div>

      <div className="mt-6">
  <p className="text-xs uppercase text-zinc-500">
    Connected Nodes
  </p>

  <div className="mt-3 space-y-2">
    {relatedEdges.map((edge, index) => {
      const other =
        edge.source === node.id
          ? nodes.find((n) => n.id === edge.target)
          : nodes.find((n) => n.id === edge.source);

      return (
        <div
          key={index}
          className="rounded-lg bg-zinc-800 p-3"
        >
          <div className="font-medium text-white">
            {other?.data.title}
          </div>

          <div className="text-xs text-cyan-400">
            {edge.label}
          </div>
        </div>
      );
    })}
  </div>
</div>

      </div>
    </aside>
  );
}