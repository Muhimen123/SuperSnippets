import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#0d1117", // Dark GitHub-style background
    color: "#c9d1d9",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    borderBottom: "1 solid #30363d",
    paddingBottom: 10,
    color: "#58a6ff",
    fontWeight: "bold",
  },
  columnContainer: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
    padding: 12,
    backgroundColor: "#161b22",
    borderRadius: 6,
    border: "1 solid #30363d",
  },
  codeLabel: {
    fontSize: 9,
    color: "#8b949e",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  codeText: {
    fontFamily: "Courier", // Standard mono font
    fontSize: 10,
    lineHeight: 1.4,
  },
});
