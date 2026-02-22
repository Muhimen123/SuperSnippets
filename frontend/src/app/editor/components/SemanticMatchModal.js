"use client";
import React from "react";

export default function SemanticMatchModal({ isOpen, onClose, results }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-mono">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold">Semantic Match Results</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {!results || results.length === 0 ? (
            <div className="text-center text-gray-500 py-8 italic">
              No semantic matches found.
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((match, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
                >
                  <div className="flex flex-col gap-1 overflow-hidden pr-4">
                    <span className="text-sm font-bold truncate" title={match.fila_one || match.file_one}>
                      {match.fila_one || match.file_one}
                    </span>
                    <span className="text-xs text-gray-500">and</span>
                    <span className="text-sm font-bold truncate" title={match.file_two}>
                      {match.file_two}
                    </span>
                  </div>
                  <div className="flex-shrink-0 bg-black text-white px-3 py-1 rounded-md text-sm font-bold">
                    {(match.similarity * 100).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t-2 border-black bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
