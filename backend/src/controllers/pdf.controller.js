import { generateTarBuffer } from "../services/pdf.service.js";

export const generatePDF = async (req, res) => {
  try {
    const { snippets, title } = req.body;
    const tarBuffer = await generateTarBuffer();

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
