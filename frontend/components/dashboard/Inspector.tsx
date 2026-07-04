"use client";

import { useMemoryStore } from "@/lib/store/memory";

const tags = ["Career", "Meeting"];

export default function Inspector() {
  const memory = useMemoryStore((state) => state.selectedMemory);

  // 1. PROFESSIONAL EMPTY STATE
  if (!memory) {
    return (
      <div className="flex h-full w-full flex-col">
        <header className="flex-none border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Properties
          </h2>
        </header>
        
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 rounded-full bg-white/5 p-3 ring-1 ring-white/10">
            <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
         <div className="space-y-3 text-center">

<h3 className="font-semibold text-zinc-200">
Knowledge Explorer
</h3>

<p className="text-sm text-zinc-500">
Select any node in the graph to inspect:
</p>

<ul className="space-y-2 text-left text-sm text-zinc-400">

<li>• Relationships</li>

<li>• Connected Technologies</li>

<li>• AI Metadata</li>

<li>• Memory Source</li>

</ul>

</div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE STATE
  return (
    <div className="flex h-full w-full flex-col">
      
      {/* Fixed Header */}
      <header className="flex-none border-b border-white/10 bg-[#09090B]/40 px-5 py-4">
        <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Properties
        </h2>
      </header>

      {/* Scrollable Content Area */}
      {/* Custom scrollbar classes assume you are using tailwind-scrollbar or standard CSS, keeping it clean */}
      <div className="flex-1 overflow-y-auto p-5">
        
        {/* Title & Description */}
        <div>
          <h3 className="text-base font-semibold text-zinc-100">
            {memory.title}
          </h3>
          {/* Note: I assumed you meant memory.description here, as the original code duplicated memory.title
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {memory.description || "No additional context provided for this memory node."}
          </p> */}
        </div>

        <hr className="my-5 border-white/5" />

        {/* Tags Section */}
        <div>
          <div className="mb-3 flex items-center text-xs font-medium uppercase tracking-wider text-zinc-500">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500/50"></span>
            Assigned Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-5 border-white/5" />

        {/* Metadata Grid (Key-Value pairs) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Source</span>
            <span className="font-medium text-zinc-300">Manual Entry</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Created</span>
            <span className="font-medium text-zinc-300">
              {memory.createdAt || "Just now"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Status</span>
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Synced
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}