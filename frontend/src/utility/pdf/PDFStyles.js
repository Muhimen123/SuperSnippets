import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff", // Clean white background
    color: "#1a1a1a",
  },
  header: {
    fontSize: 20,
    marginBottom: 24,
    color: "#000000",
    borderBottom: "2 solid #eeeeee",
    paddingBottom: 8,
    fontWeight: "bold",
  },
  // The auto-flowing container
  multiColumnArea: {
    columnCount: 2,
    columnGap: 30,
    // flexGrow: 1, <--- REMOVE THIS. It conflicts with column splitting.
    display: "block", // Force block layout instead of flex for this specific container
  },
  codeBlock: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
    border: "1 solid #e1e4e8",
    // Ensure the block is treated as a single unit
    breakInside: "avoid",
    display: "block",
  },
  fileName: {
    fontSize: 10,
    color: "#444444",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  codeText: {
    fontFamily: "Courier",
    fontSize: 9,
    lineHeight: 1.4,
    color: "#24292e",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#999999",
  },
});
