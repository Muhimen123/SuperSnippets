import { buildLatex } from "../services/pdf.service.js";

export const generatePDF = async (req, res) => {
  try {
    const { data } = req.body; // TODO: Will extract later
    const snippetString = buildLatex();
    const latexURI = `https://latexonline.cc/compile?text=${encodeURIComponent(snippetString)}`;

    const response = await fetch(latexURI);

    if (!response.ok) {
      const errorMsg = await response.text();
      return res
        .status(500)
        .json({ error: "LaTeX Compilation Error", details: errorMsg });
    }

    const pdfBuffer = await response.arrayBuffer();
    const title = "tmp";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${title || "codebook"}.pdf`,
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("PDF controller error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
