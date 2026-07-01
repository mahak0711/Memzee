const memories = [
  {
    title: "OpenAI Interview",
    tag: "Career",
    date: "Today",
  },
  {
    title: "Semantic Chunking",
    tag: "AI",
    date: "Yesterday",
  },
  {
    title: "Redis Middleware",
    tag: "Backend",
    date: "Last Week",
  },
];

export default function Timeline() {
  return (
    <aside className="border-r border-white/10 p-6 overflow-y-auto">

      <h2 className="font-display text-2xl font-semibold">
        Timeline
      </h2>

      <div className="mt-8 space-y-4">

        {memories.map((memory) => (
          <div
            key={memory.title}
            className="glass rounded-2xl p-5"
          >
            <p className="font-medium">
              {memory.title}
            </p>

            <div className="mt-3 flex justify-between text-xs text-zinc-500">

              <span>{memory.tag}</span>

              <span>{memory.date}</span>

            </div>
          </div>
        ))}

      </div>

    </aside>
  );
}