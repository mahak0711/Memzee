"use client";

import { motion } from "motion/react";
import { useMemoryStore } from "@/lib/store/memory";
import LivingBrain from "@/components/hero/LivingBrain";

export default function GraphCanvas() {
  const selectedMemory = useMemoryStore(
    (state) => state.selectedMemory
  );

  return (
    // 1. Changed to a div that acts as an interactive canvas (cursor-grab)
    <div className="relative flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing">
      
      {/* 2. Removed the hardcoded background glow since the Layout now handles ambient lighting */}
      
      {/* 3. The Central Hub / Active Node */}
      <motion.div
        key={selectedMemory?.id ?? "empty"}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 20 
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          {/* Subtle node energy pulse behind the brain */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" 
          />
          <LivingBrain />
        </div>

        {/* 4. Canvas Label Plate (Styled like a floating node data card) */}
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-white/10 bg-[#09090B]/60 px-6 py-4 shadow-2xl backdrop-blur-md">
          <h2 className="font-display text-lg font-semibold tracking-wide text-zinc-100 sm:text-xl">
            {selectedMemory ? "Active Node" : "Core Nexus"}
          </h2>
          
          <p className="mt-1.5 max-w-[260px] text-center text-sm leading-relaxed text-zinc-400">
            {selectedMemory
              ? selectedMemory.title
              : "Awaiting input. Capture a memory to spawn a new connection."}
          </p>
        </div>
      </motion.div>

    </div>
  );
}