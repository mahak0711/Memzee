import AmbientBackground from "@/components/hero/AmbientBackground";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/home/HowItWokrs";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      <AmbientBackground />
      <Hero />
      <HowItWorks/>
    </main>
  );
}