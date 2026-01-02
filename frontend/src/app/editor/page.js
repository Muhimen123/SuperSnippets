"use client";

import { useState } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import PDFSection from "./components/PDFSection";

export default function Editor() {
  const [currentTool, setCurrentTool] = useState(1);

  const handleToolSelection = (toolKey) => {
    setCurrentTool(toolKey);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Toolbar
        currentTool={currentTool}
        handleToolSelection={handleToolSelection}
      />
      <div className={`flex flex-1 overflow-hidden`}>
        <div>
          <ContentSection activeTool={currentTool} handleToolSelection={handleToolSelection} />
        </div>
        <div className={`flex-1 relative w-full h-full`}>
          <PDFSection />
        </div>
      </div>
    </div>
  );
}
