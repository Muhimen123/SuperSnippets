import express from "express";
import {
  generatePDF,
  modifyConfiguration,
  createConfiguration,
  addCollaborator,
  removeCollaborator,
} from "../controllers/pdf.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

// All PDF routes require authentication
router.post("/generate", verifyToken, generatePDF); // Generate PDF from configuration
router.post("/modify", verifyToken, modifyConfiguration); // Update the configuration
router.post("/create", verifyToken, createConfiguration); // Create a new configuration
router.post("/add-collaborator", verifyToken, addCollaborator); // Add a collaborator to a codebook
router.post("/remove-collaborator", verifyToken, removeCollaborator); // Remove a collaborator from a codebook

export default router;
