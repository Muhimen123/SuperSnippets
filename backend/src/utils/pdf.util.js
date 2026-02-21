export const buildLatexText = (snippets, config) => {
  const escapeLatex = (str) => {
    if (!str) return "";
    return str.replace(/[&%$#_{}~^\\]/g, (match) => `\\${match}`);
  };

  let codePoriton = ``;
  for (const category of snippets) {
    const categoryName = escapeLatex(category.category);
    codePoriton += `\\section{${categoryName}}\n`;
    for (const codesegment of category.codesegments) {
      const codesegmentTitle = escapeLatex(codesegment.name);
      const codesegmentContent = codesegment.content;
      codePoriton += `\\subsection{${codesegmentTitle}}\n`;
      codePoriton += `\\begin{lstlisting}\n${codesegmentContent}\n\\end{lstlisting}\n`;
    }
  }
  console.log("Configuration received: ");
  console.log(config);
  return latexTemplate(codePoriton, config);
};

const latexTemplate = (content, config) => {
  const isMulticol = config.columns && config.columns > 1;
  const colBegin = isMulticol ? `\\begin{multicols*}{${config.columns}}` : ``;
  const colEnd = isMulticol ? `\\end{multicols*}` : ``;

  const fontSize = config.fontSize || 11;
  const margin = config.marginSize || 2;
  const header = config.headerText || "Codebook";
  const orientation = config.orientation || "landscape";

  const fontMapping = {
    "Jetbrains Mono": "\\usepackage{zi4}",
    "Inconsolata": "\\usepackage{zi4}",
    "Courier": "\\usepackage{courier}",
    "Source Code Pro": "\\usepackage[defaultmono]{sourcecodepro}",
    "Bera Mono": "\\usepackage[scaled]{beramono}",
    "Default": "",
  };

  const fontPackage = fontMapping[config.font] || fontMapping["Default"];

  return `
\\documentclass[${fontSize}pt, ${orientation}, a4paper]{article}
\\usepackage[margin=${margin}cm]{geometry}
\\usepackage[T1]{fontenc}
${fontPackage}
\\usepackage{multicol}
\\usepackage{listings}
\\usepackage{xcolor}
\\usepackage{fancyhdr}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot[C]{Page \\thepage}
\\fancyhead[R]{${header}}

% Configure the look of the code blocks
\\lstset{
	basicstyle=\\ttfamily\\fontsize{${fontSize}}{${fontSize + 2}}\\selectfont,
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
${colBegin}
\\tableofcontents
\\newpage
  ${content}
${colEnd}
\\end{document}
`.trim();
};
