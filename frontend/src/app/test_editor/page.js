"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";

// PrismJS imports for syntax highlighting
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Basic light theme
import "prismjs/components/prism-javascript"; // Language definition

export default function TestEditorPage() {
  const [code, setCode] = useState(
    `function helloWorld() {\n  console.log("Hello from React Simple Code Editor!");\n  return 42;\n}`
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 font-mono text-black">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Editor Component Test</h1>
        <p className="text-gray-600">
          Using <code>react-simple-code-editor</code> + <code>prismjs</code>
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-gray-300 overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>

        {/* The Editor Component */}
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
          padding={20}
          className="font-mono text-sm leading-relaxed"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            minHeight: "300px",
          }}
          textareaClassName="focus:outline-none"
        />
      </div>

      <div className="mt-8 max-w-lg text-sm text-gray-500">
        <p>
          <strong>Note:</strong> This uses a basic Prism theme. For your main project, 
          you typically want <strong>Monaco Editor</strong> (VS Code style) for better 
          performance with large files and built-in text searching.
        </p>
      </div>
    </div>
  );
}