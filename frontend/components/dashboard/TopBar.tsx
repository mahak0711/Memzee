"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Command, ChevronRight, ChevronDown, Check } from "lucide-react";
import { useWorkspaceStore } from "@/lib/store/workspace";

export default function Topbar() {
  const { workspaces, currentWorkspace, setWorkspace } = useWorkspaceStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 1. Tell TypeScript this ref belongs to a Div element
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Tell TypeScript this is a standard MouseEvent
    function handleClickOutside(event: MouseEvent) {
      // 3. Cast event.target as Node so .contains() accepts it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  }

  document.addEventListener("keydown", handleEscape);

  return () =>
    document.removeEventListener("keydown", handleEscape);
}, []);

  return (
    <div className="flex w-full items-center justify-between py-2">
      
      {/* 1. LEFT: Breadcrumb & Custom Workspace Switcher */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-zinc-500">Memzee</span>
        
        <ChevronRight size={14} className="text-zinc-600" />
        
        {/* Custom Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="group flex items-center gap-2 rounded-md border border-transparent bg-white/5 py-1.5 pl-3 pr-2.5 font-medium text-zinc-200 outline-none transition-all hover:bg-white/10 focus:ring-2 focus:ring-cyan-500/30"
          >
            <span>{currentWorkspace?.name || "Select Workspace"}</span>
            <ChevronDown 
              size={14} 
              className={`text-zinc-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180 text-zinc-200" : "group-hover:text-zinc-200"
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 origin-top-left rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-1 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="mb-1 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Your Workspaces
              </div>
              <div className="flex flex-col gap-0.5">
                {workspaces.map((workspace) => {
                  const isActive = currentWorkspace?.id === workspace.id;
                  console.log(isDropdownOpen);
                  return (
                    <button
                      key={workspace.id}
                      onClick={() => {
                        setWorkspace(workspace);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors ${
                        isActive 
                          ? "bg-cyan-500/10 text-cyan-400" 
                          : "text-zinc-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="truncate font-medium">{workspace.name}</span>
                      {isActive && <Check size={14} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. MIDDLE/RIGHT: Search & Global Tools */}
      <div className="flex items-center gap-4">
        
        {/* Command Palette / Search Trigger */}
        <button className="hidden sm:flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-all hover:border-white/10 hover:bg-white/10 hover:text-zinc-200">
          <Search size={14} />
          <span>Search memories...</span>
          <div className="ml-6 flex items-center gap-0.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Sync Status */}
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-20" />
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          Synced
        </div>

        <div className="h-4 w-px bg-white/10" />

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-white/10 hover:text-zinc-200 active:scale-95">
          <Bell size={18} />
          {/* Notification Indicator Dot */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-[#050505] bg-cyan-500" />
        </button>
        
      </div>
    </div>
  );
}