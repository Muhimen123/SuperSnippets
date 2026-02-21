"use client";

import { useState } from "react";
import { processFiles } from "@/utility/fileProcessing";

export default function CodeImport({ files, setFiles }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const processedFiles = await processFiles(newFiles);
      setFiles((prev) => [...prev, ...processedFiles]);
    }
  };

  const handleFileSelect = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileInputChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const processedFiles = await processFiles(newFiles);
      setFiles((prev) => [...prev, ...processedFiles]);
    }
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
        {files.length > 0 && (
          <div className="w-full max-w-2xl mb-6 space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="w-full rounded-lg px-4 py-3 text-sm text-black bg-white border border-gray-200 shadow-sm flex items-center"
              >
                {/* Updated to access .title because processFiles now returns that format */}
                <span className="truncate">{file.title}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600 mb-6 text-md">Drop files here to upload.</p>
        
        <button
          onClick={handleFileSelect}
          className="bg-black text-white px-4 py-1 rounded-4xl text-sm hover:bg-black transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 active:scale-95"
        >
          Upload files
        </button>
        
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}