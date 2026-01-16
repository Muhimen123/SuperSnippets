/**
 * Generates a LaTeX string for testing.
 * This template uses the 'listings' package for better code handling.
 */
export const buildLatex = () => {
  // 1. Define some random test data inside the function
  var content = {
    name: "CounterComponent.tsx",
    content: `import React, { useState } from 'react';
export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count is {count}
    </button>
  );
};`,
  };

  const testSnippets = [
    content,
    {
      name: "CounterComponent.tsx",
      content: `import React, { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count is {count}
    </button>
  );
};`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
    {
      name: "process_data.py",
      content: `def calculate_metrics(data):
    # This is a comment to test highlighting
    total = sum(item.value for item in data)
    average = total / len(data) if data else 0
    return {"total": total, "average": average}`,
    },
  ];

  // 2. Map the snippets into LaTeX blocks
  const snippetsTex = testSnippets
    .map(
      (s) => `
\\section {${s.name.replace(/_/g, "\\_")}}
\\begin{lstlisting}
${s.content}
\\end{lstlisting}
`,
    )
    .join("\n");

  // 3. Return the full document string
  return `
\\documentclass[landscape, a4paper]{article}
\\usepackage[margin=1.5cm]{geometry}
\\usepackage{multicol}
\\usepackage{listings}
\\usepackage{xcolor}

% Configure the look of the code blocks
\\lstset{
  basicstyle=\\ttfamily,
  breaklines=true, % Important: This wraps long lines
  frame=single,
  backgroundcolor=\\color{gray!5},
  keywordstyle=\\color{blue},
  commentstyle=\\color{green!50!black},
  stringstyle=\\color{orange},
  showstringspaces=false,
  keepspaces=true
}
\\begin{document}
\\begin{multicols*}{2} % Creates two columns for the snippets
\\tableofcontents
\\newpage
  ${snippetsTex}
\\end{multicols*}
\\end{document}
`.trim();
};
