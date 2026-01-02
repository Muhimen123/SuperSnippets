import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./PDFStyles";

const CodeBookDocument = ({ title, snippets, columnCount = 2 }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.header}>{title}</Text>

      {/* FIX: No intermediate <View style={{flex:1}}>. 
          Apply columnCount directly to the main content container.
      */}
      <View style={[styles.multiColumnArea, { columnCount }]}>
        {snippets.map((snippet, index) => (
          <View key={index} style={styles.codeBlock}>
            {snippet.name && (
              <Text style={styles.fileName}>{snippet.name}</Text>
            )}
            <Text style={styles.codeText}>{snippet.content}</Text>
          </View>
        ))}
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default CodeBookDocument;