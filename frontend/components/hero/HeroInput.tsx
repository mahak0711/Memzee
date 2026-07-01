"use client";

import { motion } from "motion/react";
import {
  ArrowUp,
  Paperclip,
  Mic,
  Command,
} from "lucide-react";

export default function HeroInput() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-14 w-full max-w-3xl"
    >
      <div className="glass rounded-[28px] p-2 transition-all duration-300 hover:border-white/20">

        <textarea
          rows={3}
          placeholder="Remember that my OpenAI interview is tomorrow at 2 PM..."
          className="w-full resize-none bg-transparent px-5 py-5 text-lg text-white placeholder:text-zinc-500 focus:outline-none"
        />

        <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">

          <div className="flex items-center gap-3">

            <button className="rounded-xl p-2 transition hover:bg-white/5">
              <Paperclip size={18} />
            </button>

            <button className="rounded-xl p-2 transition hover:bg-white/5">
              <Mic size={18} />
            </button>

          </div>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-mono text-zinc-400">
              <Command size={14} />
              Enter
            </div>

            <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 p-3 text-white transition hover:scale-105">
              <ArrowUp size={18} />
            </button>

          </div>

        </div>
      </div>
    </motion.div>
  );
}