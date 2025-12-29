"use client";

import { useState } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
import PDFViewer from "./components/PDFViewer";

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
      <div className="flex flex-1 overflow-hidden">
        {/* <ContentSection className={` w-64`} activeTool={currentTool} /> */}
        <div>
          <ContentSection activeTool={currentTool} />
        </div>
        <div className={`flex-1 relative`}>
          <PDFViewer className={`w-full h-full`} />
        </div>
      </div>
    </div>
  );
}
