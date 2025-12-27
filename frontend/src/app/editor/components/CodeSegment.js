"use client";
import { useState } from "react";

export default function CodeSegment() {
  const [segments, setSegments] = useState([
    { id: 1, name: "BFS", active: true },
    { id: 2, name: "DFS", active: true },
    { id: 3, name: "Topological Sort", active: true },
    { id: 4, name: "Kadane's Algorithm", active: false },
  ]);

  const toggleSegment = (id) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === id ? { ...seg, active: !seg.active } : seg
      )
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col justify-between h-screen shadow-sm">
      <div className="flex flex-col">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <span className="text-sm font-medium">{segment.name}</span>
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
        <button className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <span className="text-sm font-medium">Add New</span>
          <span className="text-lg font-light">+</span>
        </button>
      </div>
    </div>
  );
}