"use client";

import { Search } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";

export default function SearchBar({
  nodes,
  onSelect,
}: {
  nodes: any[];
  onSelect: (node: any) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    return nodes.filter((node) =>
      node.data.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, nodes]);

  return (
    // 1. Root wrapper is now relative, NOT absolute
    <div className="relative w-full">
      
      {/* Input Container */}
      <div className="relative flex items-center">
        <Search
          size={16}
          strokeWidth={2.5}
          className="absolute left-3 text-zinc-500"
        />

        <input
          placeholder="Search entities..."
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2 pl-9 pr-12 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-500 focus:border-cyan-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-cyan-500/50"
        />

        {/* Cmd+K Hint */}
        <div className="absolute right-3 hidden items-center gap-0.5 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:flex">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* 2. Dropdown is absolute so it floats over the graph instead of stretching the toolbar */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">
          <div className="p-1">
            {results.map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  onSelect(node);
                  setQuery("");
                }}
                className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-all hover:bg-zinc-800/50"
              >
                <span className="text-sm font-medium text-zinc-200">
                  {node.data.title}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  {node.data.type || "Entity"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}