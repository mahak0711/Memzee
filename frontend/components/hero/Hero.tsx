import AmbientBackground from "./AmbientBackground";
import LivingBrain from "./LivingBrain";
import HeroInput from "./HeroInput";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-24 sm:py-32">
      
      <AmbientBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        
        {/* TEXT CONTENT GROUP */}
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            MEMZEE
          </p>

          <h1 className="max-w-5xl font-display text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Your thoughts already connect.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}Your memory should too.
            </span>
          </h1>

          <p className="max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl">
            Capture a thought and watch your memory become connected.
          </p>
        </div>

        {/* INTERACTIVE ELEMENTS GROUP */}
        {/* Adds a large gap between the text and the brain/input */}
        <div className="mt-16 flex w-full flex-col items-center space-y-10 md:mt-24 md:space-y-16">
          <LivingBrain />
          <div className="w-full max-w-xl">
            <HeroInput />
          </div>
        </div>

      </div>
    </section>
  );
}