"use client";

import { motion } from "motion/react";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0A0A0C]">
      
      {/* 1. The Fading Canvas Grid */}
      {/* We use a linear-gradient grid and a radial mask-image so it cleanly fades out at the edges */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)"
        }}
      />

      {/* 2. Top-Left Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        // Reduced opacity to 8% and increased blur for a smoother gradient falloff
        className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[200px]"
      />

      {/* 3. Bottom-Right Indigo Glow */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[200px]"
      />
      
      {/* 4. Center Node Accent */}
      {/* Adds a very subtle, static glow exactly where the LivingBrain component sits */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[120px]" />

    </div>
  );
}