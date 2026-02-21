"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import CodeEditorWindow from "./components/CodeEditorWindow";
import { FileHandler } from "@/utility/fileHandler";
import { CodeSegmentsHandler } from "@/utility/codeSegmentsHandler";

const PDFSection = dynamic(() => import("./components/PDFSection"), {
  ssr: false,
});

export default function Editor() {
  return (
    <Suspense>
      <EditorContent />
    </Suspense>
  );
}

function EditorContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // All hooks must be called before any conditional returns
  const [currentTool, setCurrentTool] = useState(1);
  const [activeFileIndex, setActiveFileIndex] = useState(null);
  const fileHandler = useMemo(() => new FileHandler(), []);
  const codeSegmentsHandler = useMemo(() => new CodeSegmentsHandler(), []);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [codeData, setCodeData] = useState({
    title: "Project Alpha Codebase",
  });

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Tree Traversal",
      items: [
        { name: "BFS", included: true, id: "c1-i1" },
        { name: "DFS", included: true, id: "c1-i2" },
        { name: "Segment Tree", included: true, id: "c1-i3" }
      ],
      isOpen: true,
    },
    {
      id: 2,
      name: "Sort",
      items: [
        { name: "Merge Sort", included: true, id: "c2-i1" },
        { name: "Bubble Sort", included: true, id: "c2-i2" },
        { name: "Quick Sort", included: true, id: "c2-i3" }
      ],
      isOpen: true,
    },
  ]);

  const [files, setFiles] = useState([]);

  // load code segments from the codesegment handler 
  // useEffect(() => {
  //   const storedSegments = codeSegmentsHandler.getSegments();
  //   if (storedSegments && storedSegments.length > 0) {
  //     setFiles(storedSegments);
  //   }
  //   setIsLoaded(true);
  // }, [codeSegmentsHandler]);

  // Load files from local storage on mount
  useEffect(() => {
    const storedFiles = fileHandler.getFiles();
    if (storedFiles && storedFiles.length > 0) {
      setFiles(storedFiles);
    } else {
      setFiles([
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
    }
    setIsLoaded(true);
  }, [fileHandler]);

  // Auto-save to local storage whenever files change
  useEffect(() => {
    if (isLoaded) {
      fileHandler.saveFiles(files);
    }
  }, [files, isLoaded, fileHandler]);

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

  // Auth check - redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

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

  const handleFileNameChange = (newName) => {
    if (activeFileIndex !== null) {
      setFiles((prev) =>
        prev.map((file, index) =>
          index === activeFileIndex ? { ...file, name: newName } : file
        )
      );
    }
  };

  const handleAddToCategory = (categoryId) => {
    if (activeFileIndex === null) return;
    const fileName = files[activeFileIndex].name;
    const id = parseInt(categoryId);

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          // Check if item exists by name
          if (!cat.items.some(item => item.name === fileName)) {
            return { 
                ...cat, 
                items: [
                    ...cat.items, 
                    { 
                        name: fileName, 
                        included: true, 
                        id: `${cat.id}-item-${Date.now()}` // Generate unique ID
                    }
                ] 
            };
          }
        }
        return cat;
      })
    );
  };

  const handleFileSelection = (index) => {
    if (activeFileIndex === index) {
      setActiveFileIndex(null);
    } else {
      setActiveFileIndex(index);
    }
  };

  const activeFile = activeFileIndex !== null ? files[activeFileIndex] : null;

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
            files={files}
            setFiles={setFiles}
            activeFileIndex={activeFileIndex}
            setActiveFileIndex={handleFileSelection}
            categories={categories}
            setCategories={setCategories}
          />
        </div>

        <div className="relative flex-1 h-full bg-gray-200 overflow-hidden">
          {activeFile ? (
            <CodeEditorWindow
              activeFile={activeFile}
              onCodeChange={handleCodeChange}
              onFileNameChange={handleFileNameChange}
              onClose={() => setActiveFileIndex(null)}
              categories={categories}
              onAddToCategory={handleAddToCategory}
            />
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
