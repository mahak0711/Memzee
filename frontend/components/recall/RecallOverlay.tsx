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
import ReactMarkdown from "react-markdown";
import {
  Brain,
  Loader2,
  Database,
  Copy,
  Check,
  Sparkles,
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
const [copied, setCopied] = useState(false);

const copyAnswer = async () => {
  if (!recallAnswer) return;

  await navigator.clipboard.writeText(recallAnswer);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  const handleRecall = async () => {
  if (!query.trim()) return;

  setRecallLoading(true);

  try {
   const result = (await recallMemory(query)) as {
  answer: string;
  source: string;
  dataset: string;
};

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
  <div className="space-y-5 py-8">

    <div className="flex items-center gap-3">

      <div className="rounded-full bg-cyan-500/15 p-2">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
      </div>

      <div>
        <p className="font-medium">
          Searching your memories...
        </p>

        <p className="text-sm text-muted-foreground">
          Querying your Cognee knowledge graph
        </p>
      </div>

    </div>

    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-1/2 rounded bg-white/10" />
      <div className="h-4 w-full rounded bg-white/10" />
      <div className="h-4 w-5/6 rounded bg-white/10" />
      <div className="h-4 w-3/4 rounded bg-white/10" />
    </div>

  </div>
)}

     {!recallLoading && !recallAnswer && (
  <div className="flex flex-col items-center justify-center py-12 text-center">

    <div className="mb-5 rounded-full border border-cyan-500/20 bg-cyan-500/10 p-4">
      <Brain className="h-8 w-8 text-cyan-400" />
    </div>

    <h3 className="text-lg font-semibold">
      Search your memory
    </h3>

    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
      Ask anything you've previously remembered.
      Memzee will search your Cognee knowledge graph and retrieve
      the most relevant memory.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-2">

      {[
        "When is my OpenAI interview?",
        "What technologies do I know?",
        "What meetings do I have?",
      ].map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => setQuery(suggestion)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
        >
          {suggestion}
        </button>
      ))}

    </div>

  </div>
)}

      {!recallLoading && recallAnswer && (
  <div className="mt-6 space-y-6">

    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-6 shadow-lg">

  <div className="mb-6 flex items-start justify-between">

    <div className="flex items-center gap-3">

      <div className="rounded-full bg-cyan-500/15 p-3">
        <Brain className="h-5 w-5 text-cyan-400" />
      </div>

      <div>

        <h3 className="font-semibold text-lg">
          Memory Recall
        </h3>

        <p className="text-sm text-muted-foreground">
          Retrieved from Cognee Knowledge Graph
        </p>

      </div>

    </div>

    <button
      onClick={copyAnswer}
      className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-zinc-400" />
      )}
    </button>

  </div>

  <ReactMarkdown >
    {recallAnswer}
  </ReactMarkdown>

</div>

    <div className="grid grid-cols-2 gap-4">

  <div className="rounded-xl border border-white/10 bg-white/5 p-5">

    <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
      Dataset
    </p>

    <p className="font-medium">
      {recallDataset}
    </p>

  </div>

  <div className="rounded-xl border border-white/10 bg-white/5 p-5">

    <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
      Source
    </p>

    <div className="flex items-center gap-2">

      <Sparkles className="h-4 w-4 text-cyan-400" />

      <span className="capitalize">
        {recallSource}
      </span>

    </div>

  </div>

</div>

  </div>
)}

    </div>

  </CommandDialog>
);
}