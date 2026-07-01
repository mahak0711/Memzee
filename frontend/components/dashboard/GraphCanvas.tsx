"use client";

import { motion } from "motion/react";
import LivingBrain from "@/components/hero/LivingBrain";

export default function GraphCanvas() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden border-r border-white/10 bg-background">

      {/* Ambient Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: .7,
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <LivingBrain />

        <h2 className="mt-8 font-display text-3xl font-bold">
          Memory Graph
        </h2>

        <p className="mt-3 max-w-sm text-center text-zinc-400">
          Your connected knowledge network will appear here.
        </p>
      </motion.div>

    </section>
  );
}