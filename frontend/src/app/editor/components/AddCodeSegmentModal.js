"use client";
import { useState } from "react";

export default function AddCodeSegmentModal({ isOpen, onClose }) {
  const [isDragOver, setIsDragOver] = useState(false);

  if (!isOpen) return null;

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
    console.log(e.dataTransfer.files);
  };

  const handleFileSelect = () => {
    document.getElementById('modalFileInput').click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]" 
      onClick={onClose}
    >
      <div 
        className={`
          w-[600px] h-[350px]
          rounded-3xl
          flex flex-col items-center justify-center
          border-2 border-dashed border-gray-500
          transition-colors duration-200
          relative
          cursor-default
        `}
        style={{ backgroundColor: isDragOver ? '#e5e5e5' : '#d9d9d9' }}
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-black mb-4 text-xs font-mono">Drop files here to upload.</p>
        
        <button
          onClick={handleFileSelect}
          className="bg-black text-white px-8 py-2 rounded-full text-xs font-mono hover:bg-gray-800 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          Upload files
        </button>
        
        <input
          id="modalFileInput"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            console.log(e.target.files);
          }}
        />
      </div>
    </div>
  );
}
