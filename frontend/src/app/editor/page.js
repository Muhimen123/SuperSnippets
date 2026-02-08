"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, Suspense } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import { useSearchParams } from "next/navigation";
// Renamed import to avoid conflict with the component name 'Editor'
import CodeEditor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";

const PDFSection = dynamic(() => import("./components/PDFSection"), {
  ssr: false,
});

export default function Editor() {
  return (
    <Suspense>
      <EditorContent />
    </Suspense>
  )
}

function EditorContent() {
  const [currentTool, setCurrentTool] = useState(1);
  const [activeFileIndex, setActiveFileIndex] = useState(null);

  const [codeData, setCodeData] = useState({
    title: "Project Alpha Codebase",
  });

  // State moved here to be shared between sidebar and editor
  const [files, setFiles] = useState([
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

          return distances;
        }
      }`,
    },
  ]);

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

  const handleCodeChange = (newCode) => {
    if (activeFileIndex !== null) {
      setFiles((prev) =>
        prev.map((file, index) =>
          index === activeFileIndex ? { ...file, content: newCode } : file
        )
      );
    }
  };

  return (
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
            files={files}
            setFiles={setFiles}
            activeFileIndex={activeFileIndex}
            setActiveFileIndex={setActiveFileIndex}
          />
        </div>

        <div className="relative flex-1 h-full bg-gray-200 overflow-hidden">
          {activeFileIndex !== null ? (
            <div className="h-full w-full bg-white flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
                <span className="font-mono text-sm font-bold text-gray-700">
                  {files[activeFileIndex].name}
                </span>
                <button 
                  onClick={() => setActiveFileIndex(null)}
                  className="text-xs text-gray-500 hover:text-black font-mono underline"
                >
                  Close Editor
                </button>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1 overflow-auto custom-scrollbar">
                <CodeEditor
                  value={files[activeFileIndex].content}
                  onValueChange={handleCodeChange}
                  highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
                  padding={20}
                  className="font-mono text-sm min-h-full"
                  style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: 14,
                    backgroundColor: "#ffffff",
                  }}
                  textareaClassName="focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 z-0">
              <PDFSection
                codeData={{ title: codeData.title, snippets: files }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
