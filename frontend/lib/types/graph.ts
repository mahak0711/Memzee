import type { Edge, Node, NodeProps } from "reactflow";

export interface MemoryNodeData extends Record<string, unknown> {
  title: string;
  type: string;
  description?: string;
  source?: string;
  color?: string;
}

export type MemoryNode = Node<MemoryNodeData>;
export type MemoryEdge = Edge<Record<string, unknown>>;

export type MemoryNodeProps = NodeProps<MemoryNodeData>;
export interface SearchBarProps {
  nodes: MemoryNode[];
  onSelect: (node: MemoryNode) => void;
}
