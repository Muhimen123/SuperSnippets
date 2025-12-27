"use client";

import { useState } from "react";
import Toolbar from "./components/Toolbar";

export default function PDFEditor() {
  const [currentTool, setCurrentTool] = useState(1);

  const handleToolSelection = (toolKey) => {
    console.log(`from actual ${toolKey}`);
    setCurrentTool(toolKey);
  };

  return (
    <div className="flex">
      <Toolbar
        currentTool={currentTool}
        handleToolSelection={handleToolSelection}
      />
      <h1 className="flex flex-row items-center justify-center text-8xl">
        {currentTool}
      </h1>
    </div>
  );
}
