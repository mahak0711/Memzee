"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import {
  Brain,
  Loader2,
  Database,
} from "lucide-react";

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

    console.log("🔥 API Result:", result);

    setRecallResult({
      query,
      answer: result.answer,
      source: result.source,
      dataset: result.dataset,
    });
console.log("🔥 API Result", result);

    console.log("✅ Store updated");
  } catch (err) {
    console.error(err);
  } finally {
    setRecallLoading(false);
  }
};

return (
  <CommandDialog
    open={recallOpen}
    onOpenChange={(open) => {
      if (!open) closeRecall();
    }}
    title="Recall Memory"
    description="Ask Memzee about your memories"
  >
    <CommandInput
      value={query}
      onValueChange={setQuery}
      placeholder="Ask Memzee anything..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          void handleRecall();
        }
      }}
    />

    <div className="border-t border-border p-6">

      {recallLoading && (
        <div className="flex items-center gap-3 text-cyan-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching memories...
        </div>
      )}

      {!recallLoading && !recallAnswer && (
        <p className="text-sm text-muted-foreground">
          Ask a question about your memories.
        </p>
      )}

      {!recallLoading && recallAnswer && (
        <div className="space-y-6">

          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <h3 className="font-semibold">
              Memory Recall
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="whitespace-pre-wrap leading-7">
              {recallAnswer}
            </p>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              {recallDataset}
            </div>

            <div>
              Source: {recallSource}
            </div>
          </div>

        </div>
      )}

    </div>

  </CommandDialog>
);
}