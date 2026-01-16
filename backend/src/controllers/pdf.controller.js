// import { buildLatex } from "../services/pdf.service.js";

// export const generatePDF = async (req, res) => {
//   try {
//     const { data } = req.body; // TODO: Will extract later
//     const snippetString = buildLatex();
//     const latexURI = `https://latexonline.cc/compile?text=${encodeURIComponent(snippetString)}`;

//     const response = await fetch(latexURI);

//     if (!response.ok) {
//       const errorMsg = await response.text();
//       console.error(errorMsg);
//       return res
//         .status(500)
//         .json({ error: "LaTeX Compilation Error", details: errorMsg });
//     }

//     const pdfBuffer = await response.arrayBuffer();
//     const title = "tmp";

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${title || "codebook"}.pdf`,
//     );
//     res.send(Buffer.from(pdfBuffer));
//   } catch (error) {
//     console.error("PDF controller error: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import { buildLatex } from "../services/pdf.service.js";
import archiver from "archiver";
import { Writable } from "stream";

export const generatePDF = async (req, res) => {
  try {
    const { snippets, title } = req.body;
    const texCode = buildLatex(snippets);

    // 1. Create the Tar archive in memory using a Buffer
    const tarBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      const archive = archiver("tar"); // Create tar archiver

      // A simple writable stream to collect chunks
      const stream = new Writable({
        write(chunk, encoding, next) {
          chunks.push(chunk);
          next();
        },
      });

      archive.pipe(stream);

      // Append the string as a file named 'main.tex'
      archive.append(texCode, { name: "main.tex" });

      archive.on("error", (err) => reject(err));
      stream.on("finish", () => resolve(Buffer.concat(chunks)));

      archive.finalize();
    });

    // 2. Prepare and Send to LaTeXOnline
    const url = `https://latexonline.cc/data?target=main.tex`;
    const formData = new FormData();
    const blob = new Blob([tarBuffer], { type: "application/x-tar" });
    formData.append("file", blob, "archive.tar");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Compiler Error: ${errorText}`);
    }

    // 3. Receive PDF and send back to frontend
    const pdfBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="codebook.pdf"`);
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("PDF generation failed:", error);
    res
      .status(500)
      .json({ error: "Compilation failed", details: error.message });
  }
};
