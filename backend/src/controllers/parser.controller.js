import { checkMatches } from "../services/parser.service.js";

export const parseCode = (req, res) => {
  const { snippetscode } = req.body;
  try {
    const similarities = checkMatches(snippetscode);
    res.status(200).json(similarities);
  } catch (error) {
    console.error("Error parsing code:", error);
    res.status(500).json({ message: "Error parsing code" });
  }
};
