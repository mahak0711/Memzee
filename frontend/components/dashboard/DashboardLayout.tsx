"use client";

import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import Timeline from "./Timeline";
import GraphCanvas from "./GraphCanvas";
import Inspector from "./Inspector";

import CommandListener from "@/components/recall/CommandListener";
import RecallOverlay from "@/components/recall/RecallOverlay";

import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

import { useUIStore } from "@/lib/store/ui";

export default function DashboardLayout() {
  const timelineOpen = useUIStore((s) => s.timelineOpen);
  const inspectorOpen = useUIStore((s) => s.inspectorOpen);

  const toggleTimeline = useUIStore((s) => s.toggleTimeline);
  const toggleInspector = useUIStore((s) => s.toggleInspector);

  return (
    <main className="flex h-screen bg-[#0A0A0C] text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Workspace */}
      <div className="flex flex-1 flex-col">

        {/* Topbar */}
        <div className="z-50 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
          <Topbar />
        </div>

        {/* Body */}
        <div className="relative flex flex-1 overflow-hidden">

          <CommandListener />
          <RecallOverlay />

          {/* Timeline */}
          <aside
            className={`
              relative
              transition-all
              duration-300
              overflow-hidden
              border-r
              border-white/10
              bg-[#09090B]/80
              backdrop-blur-xl
              ${
                timelineOpen
                  ? "w-[320px]"
                  : "w-0 border-r-0"
              }
            `}
          >
            {timelineOpen && <Timeline />}
          </aside>

          {/* Timeline Toggle */}
          <button
            onClick={toggleTimeline}
            className={`
              absolute
              top-1/2
              -translate-y-1/2
              z-50
              rounded-full
              border
              border-white/10
              bg-[#09090B]
              p-2
              shadow-xl
              transition-all
              duration-300
              hover:bg-zinc-800
              ${
                timelineOpen
                  ? "left-[304px]"
                  : "left-3"
              }
            `}
          >
            {timelineOpen ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>

          {/* Graph */}
          <div className="relative flex-1 overflow-hidden">
            <GraphCanvas />
          </div>

          {/* Inspector */}
          <aside
            className={`
              relative
              transition-all
              duration-300
              overflow-hidden
              border-l
              border-white/10
              bg-[#09090B]/80
              backdrop-blur-xl
              ${
                inspectorOpen
                  ? "w-[340px]"
                  : "w-0 border-l-0"
              }
            `}
          >
            {inspectorOpen && <Inspector />}
          </aside>

          {/* Inspector Toggle */}
          <button
            onClick={toggleInspector}
            className={`
              absolute
              top-1/2
              -translate-y-1/2
              z-50
              rounded-full
              border
              border-white/10
              bg-[#09090B]
              p-2
              shadow-xl
              transition-all
              duration-300
              hover:bg-zinc-800
              ${
                inspectorOpen
                  ? "right-[324px]"
                  : "right-3"
              }
            `}
          >
            {inspectorOpen ? (
              <PanelRightClose size={18} />
            ) : (
              <PanelRightOpen size={18} />
            )}
          </button>

        </div>
      </div>
    </main>
  );
}