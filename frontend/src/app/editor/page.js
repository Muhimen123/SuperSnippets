"use client";

import { useState } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";

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
      <div className="flex-1 flex flex-col">
        <ContentSection
          activeTool={currentTool}
          handleToolSelection={handleToolSelection}
        />
      </div>
    </div>
  );
}
