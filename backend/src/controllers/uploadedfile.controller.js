export const processUploadedFiles = async (req, res) => {
  try {
    // req.files is array of files added by multer
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const processedFiles = req.files.map((file) => {
      return {
        name: file.originalname,
        // Convert the buffer (binary data) to a UTF-8 string to read code content
        content: file.buffer.toString("utf-8"), 
      };
    });

    res.status(200).json(processedFiles);
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ 
      error: "Failed to process uploaded files", 
      details: error.message 
    });
  }
};