import AmbientBackground from "./AmbientBackground";
import LivingBrain from "./LivingBrain";
import HeroInput from "./HeroInput";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-24 sm:py-32">
      
      {/* Dynamic Workspace Background */}
      <AmbientBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        
        {/* =========================================
            1. TEXT CONTENT GROUP
            ========================================= */}
        <div className="flex flex-col items-center space-y-6">
          
          {/* Pro-Tool Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Memzee Engine Active
            </span>
          </div>

          {/* Precision Typography */}
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

        {/* =========================================
            2. INTERACTIVE NODE GROUP
            ========================================= */}
        <div className="mt-12 flex w-full flex-col items-center md:mt-20">
          
          {/* The Living Brain (Acts as the central node) */}
          <div className="relative flex flex-col items-center">
            {/* Ambient glow behind the brain */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" />
            <div className="relative z-10">
              <LivingBrain />
            </div>
            
            {/* Visual connecting line (Like a node edge connecting to the input) */}
            <div className="mt-4 h-12 w-px bg-gradient-to-b from-cyan-500/50 to-transparent sm:h-16" />
          </div>

          {/* Floating Command/Input Bar */}
          <div className="relative z-20 -mt-2 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#09090B]/60 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:-mt-4 sm:p-3">
            {/* Subtle inner border to make it feel like an embedded terminal */}
            <div className="rounded-xl border border-white/5 bg-black/40">
              <HeroInput />
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}