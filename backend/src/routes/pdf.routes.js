import express from "express";
import {
  generatePDF,
  modifyConfiguration,
  createConfiguration,
  addCollaborator,
  removeCollaborator,
} from "../controllers/pdf.controller.js";
const router = express.Router();

router.post("/generate", generatePDF); // Generate PDF from configuration
router.post("/modify", modifyConfiguration); // Update the configuration
router.post("/create", createConfiguration); // Create a new configuration
router.post("/add-collaborator", addCollaborator); // Add a collaborator to a codebook
router.post("/remove-collaborator", removeCollaborator); // Remove a collaborator from a codebook

export default router;
