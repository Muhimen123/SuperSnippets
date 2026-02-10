import React, { useState } from "react";
import CodeEditor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";

export default function CodeEditorWindow({
  activeFile,
  onCodeChange,
  onClose,
  categories,
  onAddToCategory,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // If no file is active, returning null or a placeholder handles the conditional rendering logic in parent
  if (!activeFile) return null;

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <span className="font-mono text-sm font-bold text-gray-700">
          {activeFile.name}
        </span>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-3 py-1.5 font-mono focus:ring-1 focus:ring-black focus:border-black outline-none flex items-center gap-2"
            >
              Add to category
              <svg
                className={`w-3 h-3 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onAddToCategory(cat.id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-mono text-gray-700 hover:bg-black hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-black font-mono underline"
          >
            Close Editor
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <CodeEditor
          value={activeFile.content}
          onValueChange={onCodeChange}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.javascript, "javascript")
          }
          padding={20}
          className="font-mono text-sm min-h-full"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            backgroundColor: "#ffffff",
          }}
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
}