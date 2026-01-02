"use client";

import { useState } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import { PDFViewer } from "@embedpdf/react-pdf-viewer";

export default function Editor() {
  const [currentTool, setCurrentTool] = useState(1);

  const handleToolSelection = (toolKey) => {
    setCurrentTool(toolKey);
  };

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
          />
        </div>

        <div className="relative flex-1 h-full bg-gray-200">
          <div className="absolute inset-0 z-0">
            <PDFViewer
              config={{
                src: "https://snippet.embedpdf.com/ebook.pdf",
                theme: { preference: "light" },
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
