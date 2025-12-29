export default function PDFViewer( {className} ) {
	const pdfUrl = "https://snippet.embedpdf.com/ebook.pdf";

  return (
    <div className="h-full w-full overflow-hidden">
      <iframe
        src={`${pdfUrl}#toolbar=1`}
        title="PDF Viewer"
        className="w-full h-full border-none"
        // Key for accessibility and functionality
        allow="fullscreen" 
      />
    </div>
  );
}