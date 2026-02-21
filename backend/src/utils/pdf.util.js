export const buildLatexText = (snippets) => {
    const escapeLatex = (str) => {
        if (!str) return "";
        return str.replace(/[&%$#_{}~^\\]/g, (match) => `\\${match}`);
    };

    let codePoriton = ``;
    for(const category of snippets) {
        const categoryName = escapeLatex(category.category);
        codePoriton += `\\section{${categoryName}}\n`;
        for(const codesegment of category.codesegments) {
            const codesegmentTitle = escapeLatex(codesegment.name);
            const codesegmentContent = codesegment.content;
            codePoriton += `\\subsection{${codesegmentTitle}}\n`;
            codePoriton += `\\begin{lstlisting}\n${codesegmentContent}\n\\end{lstlisting}\n`;
        }
    }

    return latexTemplate(codePoriton);
};

const latexTemplate = (content) => 
`
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
\\begin{multicols*}{3} % Creates two columns for the snippets
\\tableofcontents
\\newpage
  ${content}
\\end{multicols*}
\\end{document}
`.trim();