"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, Suspense, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import CodeEditorWindow from "./components/CodeEditorWindow";
import { FileHandler } from "@/utility/fileHandler";
import { CodeSegmentsHandler } from "@/utility/codeSegmentsHandler";
import { CodeBookHandler } from "@/utility/codeBookHandler";

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
  const [currentTool, setCurrentTool] = useState(1);
  const [activeFileIndex, setActiveFileIndex] = useState(null);
  const fileHandler = useMemo(() => new FileHandler(), []);
  const codeSegmentsHandler = useMemo(() => new CodeSegmentsHandler(), []);
  const [isLoaded, setIsLoaded] = useState(false);
  const codeBookHandler = useMemo(() => new CodeBookHandler(), []);

  const [codeData, setCodeData] = useState({
    title: "Project Alpha Codebase",
  });

  /*
  {
    items: [
      {
        codesegment: {},
        id: , 
      }
    ],
  } 
  */

  const [categories, setCategories] = useState([]);
  // const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: "Tree Traversal",
  //     items: [
  //       { name: "BFS", included: true, id: "c1-i1" },
  //       { name: "DFS", included: true, id: "c1-i2" },
  //       { name: "Segment Tree", included: true, id: "c1-i3" }
  //     ],
  //     isOpen: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Sort",
  //     items: [
  //       { name: "Merge Sort", included: true, id: "c2-i1" },
  //       { name: "Bubble Sort", included: true, id: "c2-i2" },
  //       { name: "Quick Sort", included: true, id: "c2-i3" }
  //     ],
  //     isOpen: true,
  //   },
  // ]);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const storedSegments = codeSegmentsHandler.getSegments();
    if (storedSegments && storedSegments.length > 0) {
      const mappedFiles = storedSegments.map((segment, index) => ({
        name: segment.title || segment.file_name,
        content: Array.isArray(segment.code)
          ? segment.code.join("\n")
          : segment.code,
        id: index,
        file_url: segment.file_url || "",
      }));

      setFiles(mappedFiles);
    }
    setIsLoaded(true);
  }, [codeSegmentsHandler]);

  // Auto-save to local storage whenever files change
  useEffect(() => {
    if (isLoaded) {
      fileHandler.saveFiles(files);
    }
  }, [files, isLoaded, fileHandler]);

  const handleToolSelection = (toolKey) => {
    setCurrentTool(toolKey);
  };

  const handleCodeChange = (newCode) => {
    if (activeFileIndex !== null) {
      setFiles((prev) =>
        prev.map((file, index) =>
          index === activeFileIndex ? { ...file, content: newCode } : file,
        ),
      );

      codeSegmentsHandler.updateSegmentContent(activeFileIndex, newCode);
    }
  };

  const handleFileNameChange = (newName) => {
    if (activeFileIndex !== null) {
      setFiles((prev) =>
        prev.map((file, index) =>
          index === activeFileIndex ? { ...file, name: newName } : file,
        ),
      );
    }
  };

  const handleAddToCategory = (categoryId) => {
    if (activeFileIndex === null) return;
    const fileName = files[activeFileIndex].name;
    const id = files[activeFileIndex].id;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === parseInt(categoryId)) {
          if (!cat.items.some((item) => item.name === fileName)) {
            return {
              ...cat,
              items: [
                ...cat.items,
                {
                  name: fileName,
                  included: true,
                  id: id,
                },
              ],
            };
          }
        }
        return cat;
      }),
    );
  };

  useEffect(() => {
    if (isLoaded) {
      codeBookHandler.clearCategories();
      codeBookHandler.setCategories(categories);
    }
  }, [categories, isLoaded, codeBookHandler]);

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
