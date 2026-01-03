"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import { useSearchParams } from "next/navigation";

const PDFSection = dynamic(() => import("./components/PDFSection"), {
  ssr: false,
});

export default function Editor() {
  const [currentTool, setCurrentTool] = useState(1);

  const [codeData, setCodeData] = useState({
    title: "Project Alpha Codebase",
    leftCode: "export default function App() {\n  return <h1>Hello</h1>\n}",
    rightCode: "// Rendered Output:\n// <h1>Hello</h1>",
  });

  const searchParams = useSearchParams();

  const constraints = useMemo(() => {
    const raw = searchParams.get("constraints");
    if (!raw) return null;

    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch {
      return null;
    }
  }, [searchParams]);

  const handleToolSelection = (toolKey) => {
    setCurrentTool(toolKey);
  };

  const snippets = [
    {
      name: "Button.tsx",
      content: "const Button = () => <button>Click</button>",
    },
    { name: "theme.js", content: "export const colors = { blue: '#0070f3' }" },
    {
      name: "Dijkstra.ts",
      content: `function dijkstra(graph, start) {
        const distances = {};
        const visited = new Set();
        const nodes = Object.keys(graph);

        for (let node of nodes) {
          distances[node] = Infinity;
        }
        distances[start] = 0;

        while (nodes.length) {
          nodes.sort((a, b) => distances[a] - distances[b]);
          const closestNode = nodes.shift();

          if (distances[closestNode] === Infinity) break;

          visited.add(closestNode);

          for (let neighbor in graph[closestNode]) {
            if (!visited.has(neighbor)) {
              let newDistance = distances[closestNode] + graph[closestNode][neighbor];
              if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
              }
            }
          }
        }
        return distances;
      }`,
    },
  ];

  return (
    // h-screen ensures the app takes the full viewport height
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Toolbar
        currentTool={currentTool}
        handleToolSelection={handleToolSelection}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="shrink-0">
          <ContentSection
            activeTool={currentTool}
            handleToolSelection={handleToolSelection}
            constraints={constraints}
          />
        </div>

        <div className="relative flex-1 h-full bg-gray-200">
          <div className="absolute inset-0 z-0">
            <PDFSection
              codeData={{ title: "SuperSnippets Codebook", snippets }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
