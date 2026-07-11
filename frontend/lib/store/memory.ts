import { create } from "zustand";

export type Memory = {
  id: string;
  title: string;
  content: string;
  source?: string;
  createdAt: string;
  tag: string;
};
type MemoryStore = {
memories:Memory[];
  selectedMemory: Memory | null;
  selectMemory: (memory: Memory | null) => void;


  addMemory: (memory: Memory) => void;

  // Recall UI
  recallOpen: boolean;
  recallLoading: boolean;

  recallQuery: string;
  recallAnswer: string;

  recallSource: string;
  recallDataset: string;

  confidence: number;

  openRecall: () => void;
  closeRecall: () => void;

  setRecallLoading: (loading: boolean) => void;

  setRecallResult: (data: {
    query: string;
    answer: string;
    source: string;
    dataset: string;
    confidence?: number;
  }) => void;
};

export const useMemoryStore = create<MemoryStore>((set) => ({
  // Memory

  memories: [],
  selectedMemory: null,

  addMemory: (memory) =>
    set((state) => ({
      memories: [memory, ...state.memories],
      selectedMemory: memory,
    })),

  selectMemory: (memory) =>
    set({
      selectedMemory: memory,
    }),

  // Recall

  recallOpen: false,
  recallLoading: false,

  recallQuery: "",
  recallAnswer: "",

  recallSource: "",
  recallDataset: "",

  confidence: 98,

  openRecall: () =>
    set({
      recallOpen: true,
    }),

  closeRecall: () =>
    set({
      recallOpen: false,
    }),

  setRecallLoading: (loading) =>
    set({
      recallLoading: loading,
    }),

  setRecallResult: ({
    query,
    answer,
    source,
    dataset,
    confidence,
  }) =>
    set({
      recallQuery: query,
      recallAnswer: answer,
      recallSource: source,
      recallDataset: dataset,
      confidence: confidence ?? 98,
      recallLoading: false,
      recallOpen: true,
    }),
}));