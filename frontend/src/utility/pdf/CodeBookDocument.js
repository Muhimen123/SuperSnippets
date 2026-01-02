import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './PDFStyles';

const CodeBookDocument = ({ title, leftCode, rightCode }) => (
  <Document>
    <Page size="A4" orientation='landscape' style={styles.page}>
      <Text style={styles.header}>{title}</Text>
      
      <View style={styles.columnContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.codeLabel}>Source Component</Text>
          <Text style={styles.codeText}>{leftCode}</Text>
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.codeLabel}>Logic / Output</Text>
          <Text style={styles.codeText}>{rightCode}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CodeBookDocument;