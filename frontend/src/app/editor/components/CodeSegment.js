"use client";
import { useState } from "react";
import AddCodeSegmentModal from "./AddCodeSegmentModal";
import { CodeSegmentsHandler } from "@/utility/codeSegmentsHandler";

export default function CodeSegment({
  files,
  setFiles,
  activeFileIndex,
  setActiveFileIndex,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const codeSegmentsHandler = new CodeSegmentsHandler();

  const handleFilesAdded = (newFiles) => {
    // 1. Add to the persistent handler with full schema
    codeSegmentsHandler.addSegments(newFiles);

    // 2. Add to local state 'files' for the editor UI to render immediately
    // The editor expects: { name: string, content: string, ... }
    // The newFiles from processFiles are: { title: string, code: string[], ... }
    const formattedFilesForEditor = newFiles.map((f) => ({
      name: f.title, 
      content: Array.isArray(f.code) ? f.code.join("\n") : f.code,
      type: f.type,
      file_url: f.file_url,
      // We might not have an ID yet if it hasn't gone to DB, 
      // but usually the index acts as ID in this view until refresh.
    }));
    
    setFiles((prev) => [...prev, ...formattedFilesForEditor]);
  };

  return (
    <div className="flex flex-col h-full w-80 border-r-2 border-black bg-white text-black font-mono">
      <div className="flex-1 overflow-y-auto">
        {(!files || files.length === 0) ? (
          <div className="p-4 text-center text-gray-500 text-sm italic">
            No code segments added
          </div>
        ) : (
          files.map((file, index) => (
            <div
              key={index}
              title={`${file.name}\n\n${file.file_url}`}
              onClick={() => setActiveFileIndex(index)}
              className={`
              group relative flex items-center justify-between p-4 border-b-2 border-black cursor-pointer transition-colors duration-200
              ${activeFileIndex === index ? "bg-black text-white" : "hover:bg-gray-100"}
            `}
            >
              <span className="text-sm font-bold truncate">{file.name}</span>

              <svg
                className={`w-5 h-5 ${activeFileIndex === index ? "text-white" : "text-black opacity-0 group-hover:opacity-50"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))
        )}
      </div>

      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-mono"
        >
          <span>Add New</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <AddCodeSegmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFilesAdded={handleFilesAdded}
      />
    </div>
  );
}
