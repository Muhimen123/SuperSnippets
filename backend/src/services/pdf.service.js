import archiver from "archiver";
import { Writable } from "stream";
import Codebook from "../models/Codebook.js";

export const createNewConfiguration = async (data) => {
  const codebook = new Codebook(data);
  const savedConfig = await codebook.save();
  return savedConfig._id;
}

export const generateTarBuffer = async () => {
  return new Promise((resolve, reject) => {
    const texCode = buildLatex();
    const chunks = [];
    const archive = archiver("tar");

    const stream = new Writable({
      write(chunk, encoding, next) {
        chunks.push(chunk);
        next();
      },
    });

    archive.pipe(stream);

    archive.append(texCode, { name: "main.tex" });

    archive.on("error", (err) => reject(err));
    stream.on("finish", () => resolve(Buffer.concat(chunks)));

    archive.finalize();
  });
};

const buildLatex = () => {
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
