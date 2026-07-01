import AmbientBackground from "@/components/studio/AmbientBackground";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      <AmbientBackground />
      <Navbar />
    </main>
  );
}