"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import dagre from 'dagre';
import "reactflow/dist/style.css";
import NodeDetails from "./NodeDetails";
import MemoryNode from "./MemoryNode";
import { getMemoryGraph } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GraphToolbar from "./GraphToolbar";
import { useRouter } from "next/navigation";
import GitHubImport from "../github/GitHubImport";
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
      word.includes(".")
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

function getLayoutedElements(nodes: any[], edges: any[]) {
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

  nodes.forEach((node) => {
    const position = dagreGraph.node(node.id);

    node.position = {
      x: position.x - nodeWidth / 2,
      y: position.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
}
export default function MemoryGraph() {
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { setCenter, fitView } = useReactFlow();
  const [showImport, setShowImport] = useState(false);
const router=useRouter();

  const loadGraph = async () => {
    try {
      setLoading(true);

      const graph = await getMemoryGraph();

      const nodes = graph.nodes.map((node: any) => ({
        id: node.id,
        type: "memory",
        position: { x: 0, y: 0 },
        data: {
          title: formatTitle(node.title),
          type: node.category,
          description: `${node.category} node`,
          color: colorMap[node.category] ?? "#334155",
        },
      }));

      const edges = graph.edges.map((edge: any) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.relation
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
        animated: true,
      }));

      const layout = getLayoutedElements(nodes, edges);

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
    if (searchParams.get("latest") !== "true") return;

    if (nodes.length === 0) return;

    const latest = nodes[nodes.length - 1];

    setSelectedNode(latest);

    const connected = new Set<string>();
    connected.add(latest.id);

    edges.forEach((edge: any) => {
      if (edge.source === latest.id) connected.add(edge.target);
      if (edge.target === latest.id) connected.add(edge.source);
    });

    setHighlighted(connected);

    setCenter(
      latest.position.x + 120,
      latest.position.y + 50,
      {
        zoom: 1.7,
        duration: 900,
      }
    );
  }, [nodes]);

  useEffect(() => {
    loadGraph();
  }, []);

  useEffect(() => {
    const refresh = () => loadGraph();

    window.addEventListener("memory-updated", refresh);

    return () => {
      window.removeEventListener("memory-updated", refresh);
    };
  }, []);

  const displayNodes = nodes.map((node: any) => ({
    ...node,

    style: {
      opacity:
        highlighted.size === 0
          ? 1
          : highlighted.has(node.id)
            ? 1
            : 0.35,

      transition: "opacity .25s",
    },
  }));

  useEffect(() => {

    const handler = (e: any) => {

      const node = nodes.find(
        (n: any) => n.data.title === e.detail.title
      );

      if (!node) return;

      setSelectedNode(node);

      const connected = new Set<string>();
      connected.add(node.id);

      edges.forEach((edge: any) => {
        if (edge.source === node.id) connected.add(edge.target);
        if (edge.target === node.id) connected.add(edge.source);
      });

      setHighlighted(connected);

      setCenter(
        node.position.x + 120,
        node.position.y + 50,
        {
          zoom: 1.6,
          duration: 700,
        }
      );

    };

    window.addEventListener(
      "focus-node",
      handler
    );

    return () =>
      window.removeEventListener(
        "focus-node",
        handler
      );

  }, [nodes]);

  const displayEdges = edges.map((edge: any) => ({
    ...edge,

    style: {
      opacity:
        highlighted.size === 0
          ? 1
          : highlighted.has(edge.source) &&
            highlighted.has(edge.target)
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
          <p className="text-zinc-400">
            Building your knowledge graph...
          </p>
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
    setSelectedNode(node);

    const connected = new Set<string>();
    connected.add(node.id);

    edges.forEach((edge: any) => {
      if (edge.source === node.id) connected.add(edge.target);
      if (edge.target === node.id) connected.add(edge.source);
    });

    setHighlighted(connected);

    setCenter(
      node.position.x + 120,
      node.position.y + 50,
      {
        zoom: 1.6,
        duration: 700,
      }
    );
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
onImport={() => setShowImport(true)}
/>
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {

          setSelectedNode(node);

          const connected = new Set<string>();

          connected.add(node.id);

          edges.forEach((edge: any) => {

            if (edge.source === node.id) {
              connected.add(edge.target);
            }

            if (edge.target === node.id) {
              connected.add(edge.source);
            }

          });

          setHighlighted(connected);

        }}
        fitView
        fitViewOptions={{ padding: 0.3 }}
      >
<Background
  gap={24}
  size={1.5}
/>
<MiniMap
  pannable
  zoomable
  nodeStrokeWidth={3}
/>        <Controls />
      </ReactFlow>

      <NodeDetails
        node={selectedNode}
        nodes={nodes}
        edges={edges}
        onClose={() => {
          setSelectedNode(null);
          setHighlighted(new Set());
        }}
      />
      {showImport && (
    <GitHubImport
        onClose={() => setShowImport(false)}
    />
)}
    </div>
  );
}