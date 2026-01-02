"use client";
import { useState, useRef } from "react";

export default function ImportExport({ onClose }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
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
      setUploadedFileName(files[0].name);
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
      setUploadedFileName(file.name);
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

  const handleConfirm = () => {
    if (uploadedFileName) {
      console.log("Confirmed upload for:", uploadedFileName);
      onClose();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-10 p-10 ">
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
        {uploadedFileName ? (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-mono text-sm text-gray-800 font-bold">
              {uploadedFileName}
            </p>
          </div>
        ) : (
          <p className="font-mono text-sm text-gray-600">
            Drop files here to import...
          </p>
        )}
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

      <div className="flex gap-4">
        <button
          onClick={handleExportClick}
          className="bg-black text-white px-6 py-2 rounded-full font-mono text-xs hover:scale-105 transition-transform shadow-lg"
        >
          Export Configuration file
        </button>

        {uploadedFileName && (
          <button
            onClick={handleConfirm}
            className="bg-black text-white px-6 py-2 rounded-full font-mono text-xs hover:scale-105 transition-transform shadow-lg"
          >
            Confirm Import
          </button>
        )}
      </div>
    </div>
  );
}