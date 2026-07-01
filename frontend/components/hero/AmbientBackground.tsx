"use client";

import { motion } from "motion/react";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Base Background */}
      <div className="absolute inset-0 bg-[#09090B]" />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-24 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]"
      />

      {/* Indigo Glow */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 bottom-10 h-[650px] w-[650px] rounded-full bg-indigo-500/20 blur-[180px]"
      />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

    </div>
  );
}