import archiver from "archiver";
import { Writable } from "stream";
import Codebook from "../models/Codebook.js";
import User from "../models/User.js";

export const createNewConfiguration = async (data) => {
  const codebook = new Codebook(data);
  const savedConfig = await codebook.save();
  return savedConfig._id;
};

export const addCollaboratorToCodebook = async (codebookId, collaboratorId) => {
  const updatedCodebook = await Codebook.findByIdAndUpdate(
    codebookId,
    { $addToSet: { collaborators: collaboratorId } },
    { new: true },
  );
  if (!updatedCodebook) {
    throw new Error("Could not add collaborator");
  }
  return updatedCodebook;
};

export const removeCollaboratorFromCodebook = async (
  codebookId,
  collaboratorId,
) => {
  const updatedCodebook = await Codebook.findByIdAndUpdate(
    codebookId,
    { $pull: { collaborators: collaboratorId } },
    { new: true },
  );
  if (!updatedCodebook) {
    throw new Error("Could not remove collaborator");
  }
  return updatedCodebook;
};

/**
 *
 * @param {*} userId
 * @returns {Promise<Array>} List of codebooks where the user is either owner or collaborator.
 * Each codebook includes the owner's name and the codebook name. Mainly to use it in the dashboard.
 */
export const fetchAllCodebooksForUser = async (userId) => {
  const codebooks = await Codebook.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  })
    .populate("owner", "name")
    .select("owner codebook_name updatedAt")
    .exec();

  return codebooks;
};

export const removeCodebook = async (codebookId) => {
  try {
    const deletedCodebook = await Codebook.findByIdAndDelete(codebookId);
    if (!deletedCodebook) {
      throw new Error("Codebook not found");
    }
    // Remove codebook reference from owner's document
    await User.findByIdAndUpdate(deletedCodebook.owner, {
      $pull: { codebooksID: codebookId },
    });
    return deletedCodebook;
  } catch (error) {
    throw new Error("Failed to delete codebook: " + error.message);
  }
};

// TODO: Move the following functions in utility
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
