import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import Timeline from "./Timeline";
import GraphCanvas from "./GraphCanvas";
import Inspector from "./Inspector";
import CommandListener from "@/components/recall/CommandListener"
import RecallOverlay from "@/components/recall/RecallOverlay"
export default function DashboardLayout() {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#0A0A0C] text-zinc-100 font-sans">
      
      {/* 1. APP SIDEBAR (Docked to the left edge) */}
      <Sidebar />

      {/* 2. MAIN WORKSPACE */}
      <div className="relative flex flex-1 overflow-hidden">
        
        {/* =========================================
            LAYER 1: THE CANVAS (Bottom Layer)
            ========================================= */}
        <div className="absolute inset-0 z-0">
          {/* Tines-inspired crisp canvas dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Subtle ambient glows (toned down for less distraction) */}
          <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[150px]" />
          <div className="absolute right-[30%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[150px]" />
          
          {/* The actual graph area takes up the whole screen behind the panels */}
          <div className="h-full w-full">
            <GraphCanvas />
          </div>
        </div>

        {/* =========================================
            LAYER 2: FLOATING UI (Top Layer)
            ========================================= */}
        {/* pointer-events-none allows clicking/dragging the canvas in the empty spaces */}
        <div className="pointer-events-none relative z-10 flex h-full w-full flex-col">
          
          {/* Floating Topbar */}
          <div className="p-4 pb-2">
            {/* pointer-events-auto re-enables interaction for this specific panel */}
            <header className="pointer-events-auto rounded-xl border border-white/10 bg-[#09090B]/85 px-6 py-2 shadow-xl backdrop-blur-xl">
              <Topbar />
            </header>
          </div>

          {/* Floating Side Panels */}
          <div className="flex flex-1 items-start justify-between p-4 pt-2 pb-4">
             <CommandListener />

    <RecallOverlay />

            {/* Left Panel: Timeline */}
            <aside className="pointer-events-auto flex h-full w-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#09090B]/85 shadow-2xl backdrop-blur-xl transition-all">
              <Timeline />
            </aside>

            {/* Right Panel: Inspector */}
            <aside className="pointer-events-auto flex h-full w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#09090B]/85 shadow-2xl backdrop-blur-xl transition-all">
              <Inspector />
            </aside>

          </div>
        </div>
      </div>

    </main>
  );
}