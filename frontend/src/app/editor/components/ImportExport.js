"use client";
import { useState, useRef } from "react";

export default function ImportExport() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log("Dropped file:", files[0].name);
      // Implement actual import logic here
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Implement actual import logic here
    }
  };

  const handleExportClick = () => {
    // Mock export logic
    const config = {
      version: "1.0",
      settings: { theme: "dark", fontSize: 14 },
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codebook-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-10 p-10">
      <div
        className={`
          w-full max-w-3xl h-64
          border-2 border-dashed border-gray-500 rounded-3xl
          flex flex-col items-center justify-center gap-4
          transition-colors duration-200
          ${isDragOver ? "bg-gray-200" : "bg-transparent"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="font-mono text-sm text-gray-600">
          Drop files here to import...
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
        <button
          onClick={handleImportClick}
          className="bg-black text-white px-6 py-2 rounded-full font-mono text-xs hover:scale-105 transition-transform shadow-lg"
        >
          Import configuration file
        </button>
      </div>

      <button
        onClick={handleExportClick}
        className="bg-black text-white px-6 py-2 rounded-full font-mono text-xs hover:scale-105 transition-transform shadow-lg"
      >
        Export Configuration file
      </button>
    </div>
  );
}