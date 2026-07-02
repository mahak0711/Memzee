"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useMemoryStore } from "@/lib/store/memory";
import { recallMemory } from "@/lib/api";

export default function RecallOverlay() {
  const {
    recallOpen,
    closeRecall,
    recallLoading,
    setRecallLoading,
    setRecallResult,
    recallAnswer,
    recallDataset,
    recallSource,
  } = useMemoryStore();

  const [query, setQuery] = useState("");

  const handleRecall = async () => {
    if (!query.trim()) return;

    setRecallLoading(true);

    try {
      const result = await recallMemory(query);

      setRecallResult({
        query,
        answer: result.answer,
        source: result.source,
        dataset: result.dataset,
      });
    } catch (err) {
      console.error(err);
      setRecallLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {recallOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl"
        >
          <motion.div
            initial={{ y: 40, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            className="glass w-full max-w-3xl rounded-3xl p-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-400" />
                <h2 className="font-display text-3xl">
                  Recall Memory
                </h2>
              </div>

              <button onClick={closeRecall}>
                <X />
              </button>
            </div>

            <textarea
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What did I learn about RAG?"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-5 outline-none"
            />

            <button
              onClick={() => void handleRecall()}
              disabled={recallLoading}
              className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 text-black"
            >
              {recallLoading
                ? "Searching..."
                : "Recall"}
            </button>

            {recallAnswer && (
              <div className="mt-10 space-y-6">

                <div>
                  <p className="font-mono text-xs uppercase text-cyan-400">
                    Answer
                  </p>

                  <p className="mt-3 text-lg leading-8">
                    {recallAnswer}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="glass rounded-xl p-4">
                    <p className="font-mono text-xs text-zinc-500">
                      SOURCE
                    </p>

                    <p className="mt-2">
                      {recallSource}
                    </p>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <p className="font-mono text-xs text-zinc-500">
                      DATASET
                    </p>

                    <p className="mt-2">
                      {recallDataset}
                    </p>
                  </div>

                </div>

              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}