import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "GitHub", href: "#" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-5 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-2xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold tracking-tight"
        >
          <BrainCircuit className="h-5 w-5 text-cyan-400" />
          <span>Memzee</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-zinc-300 hover:text-white"
          >
            Sign In
          </Button>

          <Button className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}