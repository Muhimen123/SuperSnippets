"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Toolbar from "./components/Toolbar";
import ContentSection from "../editor/components/ContentSection";
// import PDFSection from "./components/PDFSection";

const PDFSection = dynamic(
  () => import('./components/PDFSection'),
  { ssr: false }
);

export default function Editor() {
  const [currentTool, setCurrentTool] = useState(1);

  const [codeData, setCodeData] = useState({
    title: "Project Alpha Codebase",
    leftCode: "export default function App() {\n  return <h1>Hello</h1>\n}",
    rightCode: "// Rendered Output:\n// <h1>Hello</h1>"
  });

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
            <PDFSection codeData={codeData}/>
          </div>
        </div>
      </div>
    </div>
  );
}
