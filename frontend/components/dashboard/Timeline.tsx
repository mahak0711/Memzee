"use client";

import { motion } from "motion/react";
import { Clock3, History, Trash2 } from "lucide-react";
import { useMemoryStore } from "@/lib/store/memory";
import { useEffect, useState } from "react";
import { getMemories, forgetMemory } from "@/lib/api";
import { toast } from "sonner";

export default function Timeline() {
  const [memories, setMemories] = useState<any[]>([]);
  const selected = useMemoryStore((s) => s.selectedMemory);
  const select = useMemoryStore((s) => s.selectMemory);

  async function loadMemories() {
    try {
      const data = await getMemories();

      const formatted = data.map((m: any) => ({
        id: m.id,
        title: m.content,
        createdAt: new Date(m.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        tag: "Memory",
      }));

      setMemories(formatted);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadMemories();

    const refresh = () => loadMemories();

    window.addEventListener("memory-updated", refresh);

    return () => {
      window.removeEventListener("memory-updated", refresh);
    };
  }, []);

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();

    try {
      await forgetMemory(id);
      toast.success("Memory forgotten");
      window.dispatchEvent(new Event("memory-updated"));
      loadMemories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to forget memory");
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* 1. PINNED HEADER (Matches Inspector) */}
      <header className="flex-none flex items-center justify-between border-b border-white/10 bg-[#09090B]/40 px-5 py-4">
        <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Activity Log
        </h2>
      </header>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative flex-1 overflow-y-auto p-4">
        {/* Continuous Timeline Track */}
        {memories.length > 0 && (
          <div className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        )}

        {/* 3. EMPTY STATE */}
        {memories.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="mb-4 rounded-full bg-white/5 p-3 ring-1 ring-white/10">
              <Clock3 className="h-5 w-5 text-zinc-500" />
            </div>
            <p className="text-sm font-medium text-zinc-300">No activity yet</p>
            <p className="mt-1 text-xs text-zinc-500">
              Captured memories will appear here.
            </p>
          </div>
        ) : (
          /* 4. TIMELINE LIST */
          <div className="flex flex-col gap-3">
            {memories.map((memory, index) => {
              const isSelected = selected?.id === memory.id;

              return (
                <div key={memory.id} className="relative pl-8 pr-1">
                  {/* Node Dot */}
                  <div
                    className={`absolute left-[7px] top-[22px] h-2 w-2 -translate-x-1/2 rounded-full ring-4 ring-[#0A0A0C] transition-colors duration-300 ${
                      isSelected
                        ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                        : "bg-zinc-600"
                    }`}
                  />

                  {/* Interactive Card Wrapper */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-900/10"
                        : "border-white/5 bg-white/5 hover:border-white/15 hover:bg-white/10"
                    }`}
                  >
                    {/* Primary Click Target */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        select(memory);
                        window.dispatchEvent(
                          new CustomEvent("focus-node", {
                            detail: {
                              title: memory.title,
                            },
                          })
                        );
                      }}
                      className="flex w-full cursor-pointer flex-col items-start p-3.5 text-left"
                    >
                      {/* Card Header */}
                      <div className="flex w-full items-start justify-between">
                        <div>
                          <p
                            className={`font-mono text-[10px] uppercase tracking-wider ${
                              isSelected ? "text-cyan-400" : "text-zinc-500"
                            }`}
                          >
                            {index === 0 ? "Latest" : "History"}
                          </p>
                        </div>

                        {/* Right margin added to prevent overlap with the absolute delete button */}
                        <div className="mr-7 flex items-center gap-1 text-[10px] text-zinc-500">
                          <Clock3 size={11} />
                          {memory.createdAt}
                        </div>
                      </div>

                      {/* Card Body */}
                      <h3 className="mt-1.5 line-clamp-1 text-sm font-medium text-zinc-100">
                        {memory.title}
                      </h3>

                      {/* Tag / Meta */}
                      {memory.tag && (
                        <div className="mt-2.5">
                          <span className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                            {memory.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Separate Delete Button (Absolutely Positioned) */}
                    <button
                      onClick={(e) => handleDelete(memory.id, e)}
                      className="absolute right-3.5 top-3.5 z-10 rounded-md p-1 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                      aria-label="Delete memory"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}