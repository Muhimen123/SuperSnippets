"use client";
import { Document, Page, Text, View, StyleSheet, PDFViewer as InternalPDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1 }
});

// Create Document Component
const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello, this is my custom PDF!</Text>
      </View>
    </Page>
  </Document>
);

export default function PDFViewer() {
  return (
    <div className="h-screen w-full">
      {/* react-pdf provides its own viewer that uses an iframe internally */}
      <InternalPDFViewer className="w-full h-full">
        <MyDoc />
      </InternalPDFViewer>
    </div>
  );
}