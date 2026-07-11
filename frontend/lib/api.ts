import { useWorkspaceStore } from "@/lib/store/workspace";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function getCurrentDataset(): string {
  return useWorkspaceStore.getState().currentWorkspace.id;
}

async function parseResponse<T>(
  response: Response,
  fallbackMessage: string
): Promise<T> {
  if (!response.ok) {
    let message = fallbackMessage;

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      } else if (typeof errorData?.message === "string") {
        message = errorData.message;
      }
    } catch {
      // Keep fallback message when the response is not JSON.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function rememberMemory(content: string) {
  const dataset = getCurrentDataset();

  const response = await fetch(`${API_URL}/api/memory/remember`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      dataset,
    }),
  });

  return parseResponse(response, "Failed to store memory");
}

export async function recallMemory(query: string) {
  const dataset = getCurrentDataset();

  const response = await fetch(`${API_URL}/api/memory/recall`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      dataset,
    }),
  });

  return parseResponse(response, "Recall failed");
}

export async function getMemories() {
  const dataset = getCurrentDataset();

  const response = await fetch(
    `${API_URL}/api/memory/list?dataset=${encodeURIComponent(dataset)}`,
    {
      cache: "no-store",
    }
  );

  return parseResponse(response, "Failed to fetch memories");
}

export async function getMemoryGraph() {
  const dataset = getCurrentDataset();

  const response = await fetch(
    `${API_URL}/api/memory/graph?dataset=${encodeURIComponent(dataset)}`,
    {
      cache: "no-store",
    }
  );

  return parseResponse(response, "Failed to load memory graph");
}

export async function importGithub(url: string) {
  const dataset = getCurrentDataset();

  const response = await fetch(`${API_URL}/api/memory/github`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      dataset,
    }),
  });

  return parseResponse(response, "Failed to import repository");
}

export async function forgetMemory(id: string) {
  const dataset = getCurrentDataset();

  const response = await fetch(
    `${API_URL}/api/memory/forget/${encodeURIComponent(
      id
    )}?dataset=${encodeURIComponent(dataset)}`,
    {
      method: "DELETE",
    }
  );

  return parseResponse(response, "Failed to forget memory");
}

export async function importYoutube(url: string) {
  const dataset = getCurrentDataset();

  const response = await fetch(`${API_URL}/api/memory/youtube`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      dataset,
    }),
  });

  return parseResponse(response, "Failed to import YouTube video");
}