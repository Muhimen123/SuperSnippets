import { fetchRepoFiles } from "../services/githubService.js";

export const getRepoFiles = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "GitHub URL is required" });
    }

    const files = await fetchRepoFiles(url);
    
    res.status(200).json(files);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch repository files", 
      details: error.message 
    });
  }
};
