import React, { useState } from "react";
import CodeEditor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

export default function CodeEditorWindow({
  activeFile,
  onCodeChange,
  onFileNameChange,
  onClose,
  categories,
  onAddToCategory,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper to determine language from extension
  const getLanguage = (fileName) => {
    if (!fileName) return "javascript";
    const ext = fileName.split('.').pop().toLowerCase();
    
    const languageMap = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'css': 'css',
      'py': 'python',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'h': 'cpp',
      'hpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'kt': 'kotlin',
      'sh': 'bash',
      'json': 'json'
    };

    return languageMap[ext] || 'javascript';
  };

  // Helper to split filename and extension for display
  const getFileNameParts = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    // Handle files with no extension
    if (lastDotIndex === -1) return { name: fileName, extension: "" };
    return {
      name: fileName.substring(0, lastDotIndex),
      extension: fileName.substring(lastDotIndex)
    };
  };

  // If no file is active, returning null or a placeholder handles the conditional rendering logic in parent
  if (!activeFile) return null;

  const { name: fileNameBase, extension: fileExtension } = getFileNameParts(activeFile.name);

  // Check if file is already in a category
  const currentCategory = categories.find((cat) =>
    cat.items.some((item) => item.name === activeFile.name)
  );

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center w-48 border border-transparent hover:border-gray-300 rounded px-2 py-1 focus-within:bg-white focus-within:border-black transition-all">
          <input 
            value={fileNameBase}
            onChange={(e) => onFileNameChange(`${e.target.value}${fileExtension}`)}
            className="font-mono text-sm font-bold text-gray-700 bg-transparent outline-none flex-grow min-w-0"
            placeholder="Filename"
          />
          <span className="font-mono text-sm font-bold text-gray-500 whitespace-nowrap select-none">
            {fileExtension}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                // Only toggle dropdown if not already assigned
                if (!currentCategory) {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              className={`bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-3 py-1.5 font-mono focus:ring-1 focus:ring-black focus:border-black outline-none flex items-center gap-2 ${
                currentCategory ? "opacity-75 cursor-default bg-gray-50" : "hover:bg-gray-50"
              }`}
              title={currentCategory ? "Remove from category sidebar to change" : ""}
            >
              {currentCategory ? currentCategory.name : "Add to category"}
              {!currentCategory && (
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
              )}
            </button>

            {isDropdownOpen && !currentCategory && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                {categories.map((cat) => {
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onAddToCategory(cat.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-mono text-gray-700 hover:bg-black hover:text-white transition-colors block"
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
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
          highlight={(code) => {
            const language = getLanguage(activeFile.name);
            return Prism.highlight(
              code, 
              Prism.languages[language] || Prism.languages.javascript, 
              language
            );
          }}
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