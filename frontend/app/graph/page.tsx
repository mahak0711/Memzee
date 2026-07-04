"use client";
import { ReactFlowProvider } from "reactflow";
import MemoryGraph from "@/components/graph/MemoryGraph";

export default function GraphPage() {
  return (
    <main className="relative h-screen w-full bg-[#09090B]">
      <ReactFlowProvider>
        <MemoryGraph />
      </ReactFlowProvider>
    </main>
  );
}