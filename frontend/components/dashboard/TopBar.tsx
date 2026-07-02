"use client";

import { Search, Bell, Command, ChevronRight } from "lucide-react";

export default function Topbar() {
  return (
    // We remove the hard heights and borders here, because the DashboardLayout wrapper handles the container styling.
    <div className="flex w-full items-center justify-between py-1">
      
      {/* 1. LEFT: Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-sm">
        <button className="font-medium text-zinc-400 transition-colors hover:text-zinc-200">
          Workspace
        </button>
        
        <ChevronRight size={14} className="text-zinc-600" />
        
        {/* Active Project Dropdown Trigger */}
        <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 transition-colors hover:bg-white/10">
          <span className="font-semibold text-zinc-100">Memory Studio</span>
          <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 2. RIGHT: Global Tools & Status */}
      <div className="flex items-center gap-4">
        
        {/* Subtle Sync Status */}
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          Synced
        </div>

        <div className="h-4 w-px bg-white/10" />

        {/* Pro Search Input */}
        <div className="group flex items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-3 py-1.5 transition-all focus-within:border-cyan-500/40 focus-within:bg-black/40 hover:bg-black/40">
          <Search size={14} className="text-zinc-500 transition-colors group-focus-within:text-cyan-400" />
          <input
            placeholder="Search canvas..."
            className="w-48 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
          />
          {/* Keyboard Shortcut Hint */}
          <div className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 transition-colors group-hover:text-zinc-400">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-zinc-400 transition-all hover:bg-white/10 hover:text-zinc-200 active:scale-95">
          <Bell size={16} />
        </button>

      </div>
    </div>
  );
}