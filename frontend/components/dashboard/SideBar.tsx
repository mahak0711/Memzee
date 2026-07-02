import {
  Brain,
  LayoutDashboard,
  Search,
  Settings,
  Network
} from "lucide-react";

export default function Sidebar() {
  return (
    // 1. Narrower, darker rail that anchors the app
    <aside className="relative z-20 flex h-full w-[68px] flex-col items-center border-r border-white/10 bg-[#050505]/95 py-5 shadow-2xl backdrop-blur-xl">
      
      {/* 2. Logo / App Icon */}
      <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-lg shadow-cyan-500/20">
        <Brain size={20} className="text-white" />
      </div>

      {/* 3. Top Navigation Group */}
      <nav className="flex w-full flex-col items-center gap-2">
        
        {/* ACTIVE ITEM */}
        <button className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-all hover:bg-cyan-500/20">
          {/* Active indicator bar */}
          <div className="absolute left-0 h-5 w-1 rounded-r-full bg-cyan-400" />
          <LayoutDashboard size={20} strokeWidth={2} />
        </button>

        {/* INACTIVE ITEMS */}
        <button className="group flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-200">
          <Search size={20} strokeWidth={2} />
        </button>

        {/* Added a network icon as it fits the "Graph/Node" tool vibe */}
        <button className="group flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-200">
          <Network size={20} strokeWidth={2} />
        </button>

      </nav>

      {/* 4. Bottom Navigation Group */}
      <div className="mt-auto flex w-full flex-col items-center gap-3">
        <button className="group flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-200">
          <Settings size={20} strokeWidth={2} />
        </button>
        
        <hr className="w-8 border-white/10" />

        {/* User Profile / Avatar Placeholder */}
        <button className="h-8 w-8 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white/40">
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs font-bold text-zinc-400">
            M
          </div>
        </button>
      </div>
      
    </aside>
  );
}