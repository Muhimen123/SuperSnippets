"use client";
import { useState } from "react";

export default function ImportExport() {
  const [isDragOver, setIsDragOver] = useState(false);

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
    // Handle file drop logic here
    console.log("Dropped files");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8 p-8">
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
        <p className="font-mono text-sm text-gray-600">Drop files here to import...</p>
        <button className="bg-black text-white px-6 py-2 rounded-full font-mono text-sm hover:scale-105 transition-transform shadow-lg">
          Import configuration file
        </button>
      </div>

      <button className="bg-black text-white px-6 py-2 rounded-full font-mono text-sm hover:scale-105 transition-transform shadow-lg">
        Export Configuration file
      </button>
    </div>
  );
}