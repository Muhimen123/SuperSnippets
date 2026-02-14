import express from "express";
import {
  generatePDF,
  modifyConfiguration,
  createConfiguration,
  addCollaborator,
  removeCollaborator,
  getAllCodebooksForUser,
  deleteCodebook
} from "../controllers/pdf.controller.js";
const router = express.Router();

router.post("/generate", generatePDF); // Generate PDF from configuration
router.post("/modify", modifyConfiguration); // Update the configuration
router.post("/create", createConfiguration); // Create a new configuration
router.post("/add-collaborator", addCollaborator); // Add a collaborator to a codebook
router.post("/remove-collaborator", removeCollaborator); // Remove a collaborator from a codebook

router.get("/user-codebooks/:userId", getAllCodebooksForUser); // Get all codebooks for a user
router.delete("/delete-codebook/:codebookId", deleteCodebook); // Delete a codebook by ID

export default router;
