import { create } from "zustand";

type UIStore = {
  timelineOpen: boolean;
  inspectorOpen: boolean;

  toggleTimeline: () => void;
  toggleInspector: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  timelineOpen: true,
  inspectorOpen: true,

  toggleTimeline: () =>
    set((state) => ({
      timelineOpen: !state.timelineOpen,
    })),

  toggleInspector: () =>
    set((state) => ({
      inspectorOpen: !state.inspectorOpen,
    })),
}));