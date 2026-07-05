"use client";

import { useState } from "react";
import { Play, Download, X } from "lucide-react";
import { toast } from "sonner";
import { importYoutube } from "@/lib/api";
import { useRouter } from "next/navigation";
type Props = {
  onClose?: () => void;
};

export default function YouTubeImport({ onClose }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
const router = useRouter();

 async function handleImport() {
  if (!url.trim()) return;

  try {
    setLoading(true);

    setStatus("Fetching transcript...");
    await new Promise((r) => setTimeout(r, 500));

    setStatus("Extracting knowledge...");
    await new Promise((r) => setTimeout(r, 600));

    setStatus("Building knowledge graph...");

    await importYoutube(url);

    setStatus("Done!");

    window.dispatchEvent(new Event("memory-updated"));

    toast.success("Video imported successfully!");

    setUrl("");

    setTimeout(() => {
      onClose?.();
      router.push("/dashboard?tab=graph&latest=true");
    }, 800);

  } catch (err) {
    console.error(err);
    toast.error("Import failed.");
  } finally {
    setLoading(false);
  }
}

 return (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">

<div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#09090B] p-6">

<button
onClick={onClose}
className="absolute right-4 top-4 text-zinc-400 hover:text-white"
>
<X size={18}/>
</button>

<div className="mb-5 flex items-center gap-3">

<Play className="h-5 w-5 text-red-500"/>

<h2 className="text-lg font-semibold text-white">
Import Knowledge from YouTube
</h2>

</div>

<input
value={url}
onChange={(e)=>setUrl(e.target.value)}
placeholder="https://www.youtube.com/watch?v=..."
className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
/>

<button
onClick={handleImport}
disabled={loading}
className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white hover:bg-red-400 disabled:opacity-50"
>

<Download size={18}/>

{loading ? "Importing..." : "Import Video"}

</button>

{loading && (

<p className="mt-3 animate-pulse text-center text-sm text-red-400">

{status}

</p>

)}

</div>

</div>
);
}