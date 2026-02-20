import { fetchRepoFiles, getRawFileData } from "../services/github.service.js";

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
      details: error.message,
    });
  }
};

export const getFileContent = async (req, res) => {
  try {
    const { owner_name, repository, file_name } = req.body;

    if (!owner_name || !repository || !file_name) {
      return res.status(400).json({
        error: "Not enough information to fetch file content",
      });
    }

    const linesArray = await getRawFileData({ owner_name, repository, file_name });
    const fileData = {
      code: linesArray,
    };

    res.status(200).json(fileData);
  } catch (error) {
    console.error("Controller error when trying to get file content: ", error);
    res.status(500).json({
      error: "Failed to fetch file content",
      details: error.message,
    });
  }
};
