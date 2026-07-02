"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { rememberMemory } from "@/lib/api";
import { toast } from "sonner";
import {
  ArrowUp,
  Paperclip,
  Mic,
  Command,
  CornerDownLeft
} from "lucide-react";

import { useMemoryStore } from "@/lib/store/memory";

export default function HeroInput() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addMemory = useMemoryStore((state) => state.addMemory);

 const handleSubmit = async () => {
  if (!value.trim() || loading) return;

  setLoading(true);

  try {
    await rememberMemory(value.trim());

    toast.success("Memory stored successfully.");

    addMemory({
      id: crypto.randomUUID(),
      title: value.trim(),
      createdAt: "Just now",
      tag: "Manual",
    });

    setValue("");

    router.push("/dashboard");
  } catch (error) {
    console.error(error);

    toast.error("Failed to store memory.");
  } finally {
    setLoading(false);
  }
};

  return (
    // Removed external widths/margins since the parent Hero component now controls the layout wrapper
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex w-full flex-col"
    >
      <textarea
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // Changed to Cmd/Ctrl + Enter for submission so standard Enter creates a new line
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            void handleSubmit();
          }
        }}
        placeholder="Remember that my OpenAI interview is tomorrow at 2 PM..."
        className="w-full resize-none bg-transparent p-5 text-base leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        autoFocus
      />

      {/* Toolbar / Footer */}
      <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-3 py-2">

        {/* Left Tools */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
            title="Attach file"
          >
            <Paperclip size={16} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
            title="Voice input"
          >
            <Mic size={16} />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Pro Keyboard Shortcut Hint */}
          <div className="hidden items-center gap-1 text-[10px] font-medium tracking-wider text-zinc-500 sm:flex">
            <span className="flex h-5 items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 shadow-sm">
              <Command size={10} />
            </span>
            <span className="text-zinc-600">+</span>
            <span className="flex h-5 items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 shadow-sm">
              <CornerDownLeft size={10} />
            </span>
          </div>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!value.trim() || loading}
            className="group flex h-8 items-center gap-2 rounded-lg bg-cyan-500/10 px-4 text-xs font-semibold text-cyan-400 transition-all hover:bg-cyan-500/20 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Remembering..." : "Synthesize"}
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>

        </div>
      </div>
    </motion.div>
  );
}