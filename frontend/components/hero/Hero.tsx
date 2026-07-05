"use client";

import { useState } from "react";
import { GitBranch, Play } from "lucide-react";
import AmbientBackground from "./AmbientBackground";
import LivingBrain from "./LivingBrain";
import HeroInput from "./HeroInput";
import GitHubImport from "../github/GitHubImport";
import YouTubeImport from "../youtube/YouTubeImport";

export default function Hero() {
  const [showImport, setShowImport] = useState(false);
  const [showYoutubeImport, setShowYoutubeImport] = useState(false);

  return (
    // 1. FIXED TYPO & REDUCED PADDING: Changed `pt-` to `pt-12` and `sm:pt-28` to `sm:pt-16`
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16">
      
      <AmbientBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">

        {/* 2. TIGHTENED SPACING: Reduced to space-y-3 to pull the text block together */}
        <div className="flex flex-col items-center space-y-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Memzee Engine Active
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl md:text-[64px] md:leading-[1.1]">
            Your thoughts already connect.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              {" "}Your memory should too.
            </span>
          </h1>

          <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
            Capture a thought below and watch it instantly synthesize into your spatial memory graph.
          </p>
        </div>

        {/* 3. REDUCED MARGIN TOP: Changed mt-8 md:mt-10 to mt-6 md:mt-8 */}
        <div className="relative z-30 mt-6 w-full max-w-3xl rounded-2xl border border-white/15 bg-[#09090B]/80 p-2 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-3 md:mt-8">
          
          <div className="rounded-xl border border-white/10 bg-black/50">
            <HeroInput />
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-4 border-t border-white/5 pt-4">
            <button
              onClick={() => setShowImport(true)}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <GitBranch className="h-4 w-4 text-cyan-500 transition-transform group-hover:scale-110" />
              Import Knowledge from GitHub
            </button>

            <button
              onClick={() => setShowYoutubeImport(true)}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <Play className="h-4 w-4 text-red-500" />
              Import YouTube
            </button> 
          </div>
        </div>

        <div className="relative z-20 mt-2 flex w-full flex-col items-center opacity-90 transition-opacity duration-700 hover:opacity-100">
          <div className="h-16 w-px bg-gradient-to-b from-cyan-500/60 to-transparent sm:h-20" />

          <div className="relative -mt-2 flex flex-col items-center">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" />
            <div className="relative z-10 transition-transform duration-700 ease-out hover:scale-105">
              <LivingBrain />
            </div>
          </div>
        </div>

      </div>

      {showImport && (
        <GitHubImport onClose={() => setShowImport(false)} />
      )}
      {showYoutubeImport && (
        <YouTubeImport onClose={() => setShowYoutubeImport(false)} />
      )}

    </section>
  );
}