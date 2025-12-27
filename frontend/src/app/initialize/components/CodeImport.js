"use client";

import { useState } from "react";

export default function CodeImport() {
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
  };

  const handleFileSelect = () => {
    // Handle file selection logic here
    document.getElementById('fileInput').click();
  };

  return (
    <div className="w-full" style={{ width: '950px' }}>
      <div
        className={`
          border-2 border-dashed border-gray-400 rounded-3xl p-10 text-center min-h-[300px]
          flex flex-col items-center justify-center
          ${isDragOver ? 'border-blue-500 bg-blue-50' : ''}
        `}
        style={{ backgroundColor: isDragOver ? '#dbeafe' : '#d9d9d9' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600 mb-6 text-sm">Drop files here to upload.</p>
        
        <button
          onClick={handleFileSelect}
          className="bg-black text-white px-4 py-1 rounded-4xl text-xs hover:bg-black transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 active:scale-95"
        >
          Upload files
        </button>
        
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            // Handle file selection
            console.log(e.target.files);
          }}
        />
      </div>
    </div>
  );
}