const tags = ["Career", "Meeting"];

export default function Inspector() {
  return (
    <aside className="overflow-y-auto p-8">

      <h2 className="font-display text-2xl font-bold">
        Memory Details
      </h2>

      <div className="glass mt-8 rounded-3xl p-6">

        <h3 className="text-xl font-semibold">
          OpenAI Interview
        </h3>

        <p className="mt-4 leading-7 text-zinc-400">
          Remember that my OpenAI interview is tomorrow
          at 2 PM.
        </p>

        <div className="mt-8">

          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Tags
          </p>

          <div className="mt-3 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-2 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

        <div className="mt-8 space-y-4">

          <div>
            <p className="font-mono text-xs text-zinc-500">
              SOURCE
            </p>

            <p className="mt-1">
              Manual Entry
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-zinc-500">
              CREATED
            </p>

            <p className="mt-1">
              Today · 2:15 PM
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}