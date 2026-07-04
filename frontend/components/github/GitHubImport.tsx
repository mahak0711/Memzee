"use client";

import { useState } from "react";
import { GitBranch, Download, X } from "lucide-react";
import { toast } from "sonner";
import { importGithub } from "@/lib/api";

type Props = {
  onClose?: () => void;
};

export default function GitHubImport({ onClose }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleImport() {
    if (!url.trim()) {
      toast.error("Please enter a GitHub repository URL.");
      return;
    }

    try {
      setLoading(true);

      setStatus("Reading repository...");
      await new Promise((r) => setTimeout(r, 500));

      setStatus("Extracting knowledge...");
      await new Promise((r) => setTimeout(r, 600));

      setStatus("Building knowledge graph...");

      await importGithub(url);

      setStatus("Done!");

      window.dispatchEvent(new Event("memory-updated"));

      toast.success("Repository imported successfully!");

      setTimeout(() => {
        onClose?.();
      }, 700);
    } catch (err) {
      console.error(err);
      toast.error("Import failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#09090B] p-6 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <GitBranch className="h-6 w-6 text-cyan-400" />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Import GitHub Repository
            </h2>

            <p className="text-sm text-zinc-400">
              Import a repository and build its knowledge graph.
            </p>
          </div>
        </div>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/vercel/next.js"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-cyan-500"
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-medium text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={18} />

          {loading ? "Importing..." : "Import Repository"}
        </button>

        {loading && (
          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-3">
            <p className="animate-pulse text-center text-sm text-cyan-300">
              {status}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}