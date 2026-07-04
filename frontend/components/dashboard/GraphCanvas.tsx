"use client";

import { ReactFlowProvider } from "reactflow";
import MemoryGraph from "@/components/graph/MemoryGraph";

export default function GraphCanvas() {
  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <MemoryGraph />
      </ReactFlowProvider>
    </div>
  );
}