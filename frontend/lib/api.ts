import { getDataset } from "./dataset";
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
      dataset: getDataset()
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
      dataset: getDataset()
    }),
  });

  if (!response.ok) {
    throw new Error("Recall failed");
  }

  return response.json();
}

export async function getMemories() {
  const response = await fetch(`${API_URL}/api/memory/list?dataset=${getDataset()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch memories");
  }

  return response.json();
}

export async function getMemoryGraph() {
  const response = await fetch(`${API_URL}/api/memory/graph?dataset=${getDataset()}`);

  if (!response.ok) {
    throw new Error("Failed to load memory graph");
  }

  return response.json();
}

export async function importGithub(url: string) {
  const res = await fetch(`${API_URL}/api/memory/github`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url ,dataset:getDataset()}),
  });

  if (!res.ok) {
    throw new Error("Failed to import repository");
  }

  return res.json();
}

export async function forgetMemory(id: string) {
  const res = await fetch(
    `${API_URL}/api/memory/forget/${id}?dataset=${getDataset()}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

export async function importYoutube(url: string) {
  const response = await fetch(
      `${API_URL}/api/memory/youtube` ,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url ,dataset:getDataset()}),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to import YouTube video");
  }

  return response.json();
}