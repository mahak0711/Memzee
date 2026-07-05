import Link from "next/link";
import {
  Brain,
  LayoutDashboard,
  Search,
  Settings,
  Network,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="relative z-20 flex h-full w-[68px] flex-col items-center border-r border-white/10 bg-[#050505]/95 py-5 shadow-2xl backdrop-blur-xl">
      {/* Container for the logo - Simplified to allow the new logo design to shine */}
      <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/5 shadow-inner">
        {/* The new, refined, single-file logo asset */}
        <Image
          src="/logo.png" // Assumes you've added the new image to your public folder
          alt="Memzee Network Brain Icon"
          width={40} // Increased slightly to fill the container nicely
          height={40}
          className="rounded-lg object-contain" // object-contain ensures no stretching
        />
      </div>

      <nav className="flex w-full flex-col items-center gap-2">
        <Link
          href="/"
          title="Dashboard"
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-all hover:bg-cyan-500/20"
        >
          <div className="absolute left-0 h-5 w-1 rounded-r-full bg-cyan-400" />
          <LayoutDashboard size={20} strokeWidth={2} />
        </Link>

        {/* Other navigation items can be added here */}
        
      </nav>

      <div className="mt-auto flex w-full flex-col items-center gap-3">
        <Link
          href="/settings"
          title="Settings"
          className="group flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-200"
        >
          <Settings size={20} strokeWidth={2} />
        </Link>

        <hr className="w-8 border-white/10" />

        <button className="h-8 w-8 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white/40">
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs font-bold text-zinc-400">
            M
          </div>
        </button>
      </div>
    </aside>
  );
}
