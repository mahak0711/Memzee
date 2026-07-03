"use client";

import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

import MemoryNode from "./MemoryNode";
import { getMemoryGraph } from "@/lib/api";

const nodeTypes = {
  memory: MemoryNode,
};

export default function MemoryGraph() {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
  async function loadGraph() {
    try {
      const graph = await getMemoryGraph();

      console.log("GRAPH:", graph);

      setNodes(
        graph.nodes.map((node: any, index: number) => ({
          id: node.id,
          type: "memory",
          position: {
            x: 150 + (index % 2) * 350,
            y: 100 + Math.floor(index / 2) * 220,
          },
          data: {
            title: node.title,
            type: node.category,
            description: `${node.category} memory`,
          },
        }))
      );

      setEdges(
  graph.edges.map((edge: any) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.relation,
    animated: true,
  }))
);
    } catch (error) {
      console.error("Failed to load graph:", error);
    }
  }

  loadGraph();
}, [setNodes, setEdges]);

  return (
    <div className="h-[800px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}