"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import NodeDetails from "./NodeDetails";
import { getMemoryGraph } from "@/lib/api";
import { useEffect, useState, useRef } from "react";
import GraphToolbar from "./GraphToolbar";
import GitHubImport from "../github/GitHubImport";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import YouTubeImport from "../youtube/YouTubeImport";
import { useWorkspaceStore } from "@/lib/store/workspace";
import { useMemoryStore } from "@/lib/store/memory";
import MemoryNode from "./MemoryNode";

import type { GraphNode, GraphEdge } from "@/lib/types/api";
import type {
  MemoryEdge,
  MemoryNode as MemoryNodeType,
  MemoryNodeData,
} from "@/lib/types/graph";

type FocusNodeEvent = CustomEvent<{
  title: string;
}>;

const nodeTypes = {
  memory: MemoryNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const colorMap: Record<string, string> = {
  Person: "#10b981",
  Technology: "#8b5cf6",
  Project: "#f59e0b",
  Organization: "#ef4444",
  Language: "#06b6d4",
  Framework: "#3b82f6",
  Database: "#f97316",
  Entity: "#2563eb",
};

const nodeWidth = 260;
const nodeHeight = 110;

const formatTitle = (text: string) =>
  text
    .split(" ")
    .map((word) =>
      word.includes(".") ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

function getLayoutedElements(
  nodes: MemoryNodeType[],
  edges: MemoryEdge[]
): {
  nodes: MemoryNodeType[];
  edges: MemoryEdge[];
} {
  dagreGraph.setGraph({
    rankdir: "BT",
    ranksep: 180,
    nodesep: 120,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}

export default function MemoryGraph() {
  const workspaceId = useWorkspaceStore((s) => s.currentWorkspace.id);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<MemoryNodeType | null>(null);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<MemoryNodeData>([]);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState<Record<string, unknown>>([]);
  const [loading, setLoading] = useState(true);
  const { setCenter, fitView } = useReactFlow();
  const [showImport, setShowImport] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const [showYoutubeImport, setShowYoutubeImport] = useState(false);
  const selectMemory = useMemoryStore((s) => s.selectMemory);

  const handleCapture = async () => {
    if (!graphRef.current) return;

    try {
      toast.loading("Capturing graph...", {
        id: "capture",
      });

      const viewport = graphRef.current.querySelector(
        ".react-flow__viewport"
      ) as HTMLElement;

      if (!viewport) return;

      const dataUrl = await toPng(viewport, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#09090B",
      });

      const link = document.createElement("a");

      link.download =
        selectedNode?.data?.title?.replace(/\s+/g, "-").toLowerCase() +
        ".png" || "memzee-graph.png";

      link.href = dataUrl;
      link.click();

      toast.success("Graph exported!", {
        id: "capture",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to capture graph.", {
        id: "capture",
      });
    }
  };

  const focusNode = (node: MemoryNodeType) => {
    selectMemory({
      id: node.id,
      title: node.data.title,
      content: node.data.description ?? "",
      source: "Knowledge Graph",
      createdAt: "",
      tag: node.data.type,
    });

    const connected = new Set<string>();
    connected.add(node.id);

    edges.forEach((edge: MemoryEdge) => {
      if (edge.source === node.id) connected.add(edge.target);
      if (edge.target === node.id) connected.add(edge.source);
    });

    setHighlighted(connected);
    setSelectedNode(node);

    requestAnimationFrame(() => {
      fitView({
        nodes: [...connected].map((id) => ({ id })),
        duration: 700,
        padding: 0.45,
      });
    });
  };

  const loadGraph = async () => {
    try {
      setLoading(true);

     const graph = await getMemoryGraph();

const graphNodes: MemoryNodeType[] = graph.nodes.map(
  (node: GraphNode) => ({
    id: node.id,
    type: "memory",
    position: { x: 0, y: 0 },
    data: {
      title: formatTitle(node.title),
      type: node.category,
      description: `${node.category} node`,
      color: colorMap[node.category] ?? "#334155",
    },
  })
);

const graphEdges: MemoryEdge[] = graph.edges.map(
  (edge: GraphEdge) => ({
    id: edge.id ?? `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    label: edge.relation
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    animated: true,
  })
);

     const nodeIds = new Set(graphNodes.map((node) => node.id));

const validEdges = graphEdges.filter(
  (edge) =>
    nodeIds.has(edge.source) &&
    nodeIds.has(edge.target)
);

const layout = getLayoutedElements(
  graphNodes,
  validEdges
);

setNodes(layout.nodes);
setEdges(layout.edges);
      requestAnimationFrame(() => {
        fitView({
          padding: 0.35,
          duration: 800,
        });
      });
    } catch (err) {
      console.error("Failed to load graph:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nodes.length === 0) return;

    const latest = nodes[nodes.length - 1];
    setSelectedNode(latest);

    const connected = new Set<string>();
    connected.add(latest.id);

    edges.forEach((edge: MemoryEdge) => {
      if (edge.source === latest.id) connected.add(edge.target);
      if (edge.target === latest.id) connected.add(edge.source);
    });

    setHighlighted(connected);

    setCenter(latest.position.x + 120, latest.position.y + 50, {
      zoom: 1.7,
      duration: 900,
    });
  }, [nodes]); // Note: you might want to adjust these dependencies later if it causes infinite loops, but keeping logic matching your original

  useEffect(() => {
    setSelectedNode(null);
    setHighlighted(new Set());
    selectMemory(null);
    loadGraph();
  }, [workspaceId]);

  useEffect(() => {
    const refresh = () => loadGraph();
    window.addEventListener("memory-updated", refresh);
    return () => {
      window.removeEventListener("memory-updated", refresh);
    };
  }, [workspaceId]);

  useEffect(() => {
    const clearSelection = () => {
      setSelectedNode(null);
      setHighlighted(new Set());
      requestAnimationFrame(() => {
        fitView({
          duration: 600,
          padding: 0.35,
        });
      });
    };

    window.addEventListener("clear-selection", clearSelection);
    return () => {
      window.removeEventListener("clear-selection", clearSelection);
    };
  }, [fitView]);

  useEffect(() => {
    const handler = (e: Event) => {
      const event = e as FocusNodeEvent;

      const node = nodes
        .filter((n: MemoryNodeType) =>
          event.detail.title
            ?.toLowerCase()
            .includes(n.data.title.toLowerCase())
        )
        .sort((a, b) => b.data.title.length - a.data.title.length)[0];

      if (!node) return;

      focusNode(node);
    };

    window.addEventListener("focus-node", handler);

    return () => {
      window.removeEventListener("focus-node", handler);
    };
  }, [nodes, edges, fitView]); // <-- THIS was the hook missing the closing curly brace

  const displayNodes = nodes.map((node: MemoryNodeType) => ({
    ...node,
    style: {
      opacity:
        highlighted.size === 0 ? 1 : highlighted.has(node.id) ? 1 : 0.08,
      transition: "opacity .25s",
    },
  }));

  const displayEdges = edges.map((edge: MemoryEdge) => ({
    ...edge,
    style: {
      opacity:
        highlighted.size === 0
          ? 1
          : highlighted.has(edge.source) && highlighted.has(edge.target)
            ? 1
            : 0.2,
      transition: "opacity .25s",
    },
  }));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090b]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="text-zinc-400">Building your knowledge graph...</p>
        </div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090b]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            No memories yet
          </h2>
          <p className="mt-2 text-zinc-400">
            Start remembering something to build your graph.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <GraphToolbar
        nodeCount={nodes.length}
        edgeCount={edges.length}
        nodes={displayNodes}
        onSelect={(node) => {
          focusNode(node);
        }}
        onReset={() => {
          fitView({
            duration: 700,
            padding: 0.35,
          });

          setHighlighted(new Set());
          setSelectedNode(null);
        }}
        onFit={() =>
          fitView({
            duration: 700,
            padding: 0.35,
          })
        }
        onCapture={handleCapture}
        onImport={() => setShowImport(true)}
        onImportYoutube={() => setShowYoutubeImport(true)}
      />
      <div ref={graphRef} className="h-full w-full">
        <ReactFlow
          nodes={displayNodes}
          edges={displayEdges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => {
            focusNode(node);
          }}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        >
          <Background gap={24} size={1.5} />
          <MiniMap pannable zoomable nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
      <NodeDetails
        node={selectedNode}
        nodes={nodes}
        edges={edges}
        onClose={() => {
          setSelectedNode(null);
          setHighlighted(new Set());
        }}
      />
      {showImport && <GitHubImport onClose={() => setShowImport(false)} />}
      {showYoutubeImport && (
        <YouTubeImport onClose={() => setShowYoutubeImport(false)} />
      )}
    </div>
  );
}