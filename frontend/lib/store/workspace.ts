import { create } from "zustand";

type Workspace = {
  id: string;
  name: string;
};

type WorkspaceStore = {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  setWorkspace: (workspace: Workspace) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [
    { id: "personal", name: "Personal" },
    { id: "career", name: "Career" },
    { id: "research", name: "Research" },
  ],

  currentWorkspace: {
    id: "personal",
    name: "Personal",
  },

  setWorkspace: (workspace) =>
    set({
      currentWorkspace: workspace,
    }),
}));