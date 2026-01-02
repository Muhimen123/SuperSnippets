"use state";

import { PDFViewer } from "@embedpdf/react-pdf-viewer";
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import CodeBookDocument from "@/utility/pdf/CodeBookDocument";

export default function PDFSection({ codeData }) {
  const [instance, updateInstance] = usePDF({
    document: <CodeBookDocument {...codeData} />,
  });

  useEffect(() => {
    updateInstance(<CodeBookDocument {...codeData} />);
  }, [codeData, updateInstance]);

  return (
    <PDFViewer
      key={instance.url} // forces re-render on code change
      config={{
        src: instance.url,
        theme: { preference: "light" },
        disabledCategories: ['annotation', 'document-print', 'export', 'redaction'],
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
