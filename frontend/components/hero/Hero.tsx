import AmbientBackground from "./AmbientBackground";
import LivingBrain from "./LivingBrain";
import HeroInput from "./HeroInput";
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      <AmbientBackground />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">

        <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
          MEMZEE
        </p>

        <h1 className="mt-8 max-w-5xl font-display text-7xl font-extrabold tracking-tight">
          Your thoughts already connect.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Your memory should too.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-400">
          Capture a thought and watch your memory become connected.
        </p>
        <LivingBrain />
        <HeroInput />

      </div>

    </section>
  );
}