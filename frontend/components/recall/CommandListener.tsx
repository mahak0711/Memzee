"use client";

import { useEffect } from "react";
import { useMemoryStore } from "@/lib/store/memory";

export default function CommandListener() {
  const openRecall = useMemoryStore(
    (state) => state.openRecall
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        openRecall();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [openRecall]);

  return null;
}