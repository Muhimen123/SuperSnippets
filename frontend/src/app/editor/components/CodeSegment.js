"use client";
import { useState } from "react";
import AddCodeSegmentModal from "./AddCodeSegmentModal";

export default function CodeSegment() {
  const [segments, setSegments] = useState([
    { id: 1, name: "BFS", active: true },
    { id: 2, name: "DFS", active: true },
    { id: 3, name: "Topological Sort", active: true },
    { id: 4, name: "Kadane's Algorithm", active: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSegment = (id) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === id ? { ...seg, active: !seg.active } : seg
      )
    );
  };

  return (
    <div className="flex flex-col h-full w-80 border-r-2 border-black bg-white text-black font-mono">
      <div className="flex-1 overflow-y-auto">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="flex items-center justify-between p-4 border-b-2 border-black hover:bg-gray-100"
          >
            <span className="text-sm font-bold truncate">{segment.name}</span>
            <button
              onClick={() => toggleSegment(segment.id)}
              className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                segment.active ? "bg-black" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                  segment.active ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
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

      <AddCodeSegmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}