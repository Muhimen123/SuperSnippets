"use client";
import { useState } from "react";

export default function AddCodeSegmentModal({ isOpen, onClose, onFilesAdded }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = () => {
    document.getElementById('modalFileInput').click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDone = () => {
    if (onFilesAdded && files.length > 0) {
      onFilesAdded(files);
    }
    setFiles([]);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className={`
          w-[600px] min-h-[350px]
          rounded-3xl
          flex flex-col items-center justify-center
          border-2 border-dashed border-gray-400
          relative
          p-8
          transition-colors duration-200
        `}
        style={{ backgroundColor: isDragOver ? '#dbeafe' : '#d9d9d9' }}
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files.length > 0 && (
          <div className="w-full mb-6 space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="w-full rounded-lg px-4 py-3 text-sm text-black bg-white border border-gray-200 shadow-sm flex items-center"
              >
                <span className="truncate">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600 mb-6 text-md font-mono">Drop files here to upload.</p>
        
        <button
          onClick={handleFileSelect}
          className="bg-black text-white px-4 py-1 rounded-4xl text-sm hover:bg-black transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 active:scale-95 font-mono"
        >
          Upload files
        </button>
        
        <input
          id="modalFileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleDone}
            className="px-6 py-1 rounded-lg text-sm hover:bg-gray-200 transition-all duration-300 font-mono text-black"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
