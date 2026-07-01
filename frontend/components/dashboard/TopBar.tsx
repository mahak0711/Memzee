export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">

      <div>
        <h1 className="font-display text-3xl font-bold">
          Memory Studio
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Your connected memory workspace
        </p>
      </div>

      <div className="glass rounded-full px-5 py-3 font-mono text-sm">
        Synced
      </div>

    </header>
  );
}