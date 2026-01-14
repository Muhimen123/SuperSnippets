"use client";

import { PDFViewer } from "@embedpdf/react-pdf-viewer";
import { useEffect, useState } from "react";

export default function PDFSection({ codeData }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiURL = "http://localhost:8000/api/pdf/generate";
  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            snippets: codeData.snippets,
            columnCount: 2,
            title: codeData.title,
          }),
        });
        console.log(response);
        if (!response.ok) throw new Error("Failed to generate PDF");

        // Receive the binary PDF data
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Cleanup the old URL memory before setting a new one
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        setPdfUrl(url);
      } catch (error) {
        console.error("PDF Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 800ms after typing stops before calling the backend
    const timeoutId = setTimeout(fetchPDF, 800);
    return () => clearTimeout(timeoutId);
  }, [codeData]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <p className="text-blue-600 font-medium animate-pulse">
            Compiling LaTeX...
          </p>
        </div>
      )}

      {pdfUrl && (
        <PDFViewer
          key={pdfUrl} // Re-renders the viewer whenever a new PDF arrives
          config={{
            src: pdfUrl,
            theme: { preference: "light" },
            disabledCategories: [
              "annotation",
              "document-print",
              "document-menu",
              "export",
              "redaction",
              "panel-comment",
            ],
          }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
