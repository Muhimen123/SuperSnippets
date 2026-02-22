import { checkMatches } from "../services/parser.service.js";

export const parseCode = (req, res) => {
  const { snippetscode } = req.body;
  try {
    checkMatches(snippetscode);
    res.status(200).json({ message: "Code parsed successfully" });
  } catch (error) {
    console.error("Error parsing code:", error);
    res.status(500).json({ message: "Error parsing code" });
  }
};
