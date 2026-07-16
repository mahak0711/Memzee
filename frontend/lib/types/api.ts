export interface RememberResponse {
  success: boolean;
  message: string;
}

export interface RecallResponse {
  answer: string;
  kind: string;
  search_type: string;
  dataset: string;
  source: string;
}

export interface ImportResponse {
  success: boolean;
  message: string;
}

export interface MemoryItem {
  id: string;
  source: string;
  content: string;
  created_at: string;
}

export interface GraphNode {
  id: string;
  title: string;
  category: string;
}

export interface GraphEdge {
  id?:string,
  source: string;
  target: string;
  relation: string;
}

export interface MemoryGraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

type FocusNodeEvent =
  CustomEvent<{
    title: string;
  }>;