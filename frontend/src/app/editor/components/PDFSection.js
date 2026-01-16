"use client";

import { PDFViewer } from "@embedpdf/react-pdf-viewer";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/utility/constants";

export default function PDFSection({ codeData }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const apiURL = API_ROUTES.PDF.GENERATE;
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

        if (!response.ok) throw new Error("Failed to generate PDF");

        // Receive the binary PDF data
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Cleanup the old URL memory before setting a new one
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        setPdfUrl(url);
        setErrorLoading(false);
      } catch (error) {
        console.error("PDF Fetch Error:", error);
        setErrorLoading(true);
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
      {loading && <PDFLoading />}

      {errorLoading && <ErrorScreen />}

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

function PDFLoading() {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-500">
      <div className="relative flex flex-col items-center">
        {/* Animated Spinner Ring */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Document Icon in Center */}
        <div className="absolute top-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        {/* Text Feedback */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-lg font-semibold text-gray-800 tracking-tight">
            Generating PDF
          </span>
        </div>
      </div>

      <style jsx>
        {`
          @keyframes loading {
            0% {
              transform: scaleX(0);
            }
            50% {
              transform: scaleX(0.7);
            }
            100% {
              transform: scaleX(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

function ErrorScreen() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-md p-6 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-sm">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          PDF Generation Failed
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          There was an error compiling your snippets into a PDF
        </p>

        <button
          onClick={handleRefresh}
          className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
