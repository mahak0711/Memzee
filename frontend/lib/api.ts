const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function rememberMemory(content: string) {
  const response = await fetch(`${API_URL}/api/memory/remember`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to store memory");
  }

  return response.json();
}

export async function recallMemory(query: string) {
  const response = await fetch(`${API_URL}/api/memory/recall`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error("Recall failed");
  }

  return response.json();
}

export async function getMemories() {
  const response = await fetch(`${API_URL}/api/memory/list`);

  if (!response.ok) {
    throw new Error("Failed to fetch memories");
  }

  return response.json();
}

export async function getMemoryGraph() {
  const response = await fetch(`${API_URL}/api/memory/graph`);

  if (!response.ok) {
    throw new Error("Failed to load memory graph");
  }

  return response.json();
}