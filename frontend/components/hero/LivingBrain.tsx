"use client";

import { motion } from "motion/react";

// Adjusted radii to be slightly smaller and more precise
const nodes = [
  { x: 200, y: 200, r: 14, core: true },

  { x: 200, y: 95, r: 6 },
  { x: 285, y: 130, r: 6 },
  { x: 315, y: 200, r: 6 },
  { x: 285, y: 270, r: 6 },
  { x: 200, y: 305, r: 6 },
  { x: 115, y: 270, r: 6 },
  { x: 85, y: 200, r: 6 },
  { x: 115, y: 130, r: 6 },

  { x: 200, y: 40, r: 4 },
  { x: 340, y: 100, r: 4 },
  { x: 360, y: 200, r: 4 },
  { x: 340, y: 300, r: 4 },
  { x: 200, y: 360, r: 4 },
  { x: 60, y: 300, r: 4 },
  { x: 40, y: 200, r: 4 },
  { x: 60, y: 100, r: 4 },
];

const links = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1],
  [1,9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],[8,16],
];

export default function LivingBrain() {
  return (
    // Removed arbitrary margins so the parent components control the spacing
    <div className="relative flex items-center justify-center">

      {/* Subtle Ambient Core Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute h-[240px] w-[240px] rounded-full bg-cyan-500/15 blur-[80px]"
      />

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="overflow-visible"
      >
        {/* Links (Thinner, sharper lines) */}
        {links.map(([a, b], i) => (
          <motion.line
            key={`link-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Technical Orbital Rings */}
        <motion.circle
          cx="200"
          cy="200"
          r="105"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="4 6" // Creates a dashed "radar" look
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />

        <motion.circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={{ rotate: -360 }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Nodes */}
        {nodes.map((node, index) => (
          <g key={`node-${index}`}>
            {/* Core Node Gets an Outer Pulse Ring */}
            {node.core && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r + 6}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}

            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              /* Pro nodes usually have dark backgrounds with sharp borders */
              fill="#0A0A0C" 
              stroke={node.core ? "#22d3ee" : "rgba(255,255,255,0.4)"}
              strokeWidth={node.core ? 2.5 : 1.5}
              initial={{ scale: 0 }}
              animate={{
                scale: node.core ? [1, 1.05, 1] : 1,
              }}
              transition={{
                scale: {
                  duration: node.core ? 3 : 0,
                  repeat: node.core ? Infinity : 0,
                  ease: "easeInOut",
                },
                default: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.05,
                }
              }}
              style={{
                filter: node.core 
                  ? "drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))" 
                  : "none",
              }}
            />
            
            {/* Inner Dot for Core Node */}
            {node.core && (
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={4} 
                fill="#22d3ee" 
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}