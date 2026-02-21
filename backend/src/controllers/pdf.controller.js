import {
  generateTarBuffer,
  createNewConfiguration,
  addCollaboratorToCodebook,
  removeCollaboratorFromCodebook,
  fetchAllCodebooksForUser,
  removeCodebook,
  modifyCodebook,
  fetchCodebookById,
} from "../services/pdf.service.js";

export const generatePDF = async (req, res) => {
  try {
    const { snippets, title } = req.body;
    const tarBuffer = await generateTarBuffer();

    const url = `https://latexonline.cc/data?target=main.tex`;
    const formData = new FormData();
    const blob = new Blob([tarBuffer], { type: "application/x-tar" });
    formData.append("file", blob, "archive.tar");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Compiler Error: ${errorText}`);
    }

    const pdfBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="codebook.pdf"`);
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("PDF generation failed:", error);
    res
      .status(500)
      .json({ error: "Compilation failed", details: error.message });
  }
};

export const createConfiguration = async (req, res) => {
  try {
    const codeBookData = req.body;
    const savedConfigID = await createNewConfiguration(codeBookData);
    res.status(201).json({
      codebookId: savedConfigID,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create configuration",
      details: error.message,
    });
  }
};

export const fetchCodebookDetails = async (req, res) => {
  try {
    const codebookId = req.params.codebookId;
    const codebook = await fetchCodebookById(codebookId);
    res.status(200).json(codebook);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch codebook details",
      details: error.message,
    });
  }
};

export const modifyConfiguration = async (req, res) => {
  try {
    const { codebookId, updatedData } = req.body;
    const updatedCodebook = await modifyCodebook(codebookId, updatedData);
    res.status(200).json({
      message: "Configuration updated successfully",
      codebook: updatedCodebook,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update configuration",
      details: error.message,
    });
  }
};

export const addCollaborator = async (req, res) => {
  try {
    const { codebookId, collaboratorId } = req.body;
    await addCollaboratorToCodebook(codebookId, collaboratorId);
    res.status(200).json({
      message: "Collaborator added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add collaborator", details: error.message });
  }
};

export const removeCollaborator = async (req, res) => {
  try {
    const { codebookId, collaboratorId } = req.body;
    await removeCollaboratorFromCodebook(codebookId, collaboratorId);
    res.status(200).json({
      message: "Collaborator removed successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove collaborator", details: error.message });
  }
};

export const getAllCodebooksForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const codebooks = await fetchAllCodebooksForUser(userId);
    res.status(200).json(codebooks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch codebooks", details: error.message });
  }
};

export const deleteCodebook = async (req, res) => {
  try {
    const codebookId = req.params.codebookId;
    await removeCodebook(codebookId);
    res.status(200).json({
      message: "Codebook deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete codebook", details: error.message });
  }
};
