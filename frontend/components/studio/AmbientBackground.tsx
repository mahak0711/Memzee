export default function AmbientBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[#09090B]" />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[160px]" />

        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[180px]" />
      </div>
    </>
  );
}