"use client";

import { motion } from "motion/react";

const nodes = [
  { x: 200, y: 200, r: 18, core: true },

  { x: 200, y: 95, r: 8 },
  { x: 285, y: 130, r: 8 },
  { x: 315, y: 200, r: 10 },
  { x: 285, y: 270, r: 8 },
  { x: 200, y: 305, r: 8 },
  { x: 115, y: 270, r: 8 },
  { x: 85, y: 200, r: 10 },
  { x: 115, y: 130, r: 8 },

  { x: 200, y: 40, r: 5 },
  { x: 340, y: 100, r: 5 },
  { x: 360, y: 200, r: 5 },
  { x: 340, y: 300, r: 5 },
  { x: 200, y: 360, r: 5 },
  { x: 60, y: 300, r: 5 },
  { x: 40, y: 200, r: 5 },
  { x: 60, y: 100, r: 5 },
];

const links = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],

  [1,2],[2,3],[3,4],[4,5],
  [5,6],[6,7],[7,8],[8,1],

  [1,9],
  [2,10],
  [3,11],
  [4,12],
  [5,13],
  [6,14],
  [7,15],
  [8,16],
];

export default function LivingBrain() {
  return (
    <div className="relative mt-14 flex items-center justify-center">

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [.4, .7, .4],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="overflow-visible"
      >
        {links.map(([a,b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(255,255,255,.10)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              delay: i * .04,
            }}
          />
        ))}

        <motion.circle
          cx="200"
          cy="200"
          r="105"
          fill="none"
          stroke="rgba(255,255,255,.05)"
          strokeWidth="1"
          animate={{ rotate: 360 }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "200px 200px",
          }}
        />

        <motion.circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="rgba(255,255,255,.03)"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "200px 200px",
          }}
        />

        {nodes.map((node, index) => (
          <motion.circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.core ? "#06B6D4" : "#4CD7F6"}
            animate={{
              scale: node.core
                ? [1,1.18,1]
                : [1,1.08,1],
            }}
            transition={{
              duration: node.core ? 2.5 : 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter:
                node.core
                  ? "drop-shadow(0 0 25px #06B6D4)"
                  : "drop-shadow(0 0 10px #06B6D4)",
            }}
          />
        ))}
      </svg>
    </div>
  );
}