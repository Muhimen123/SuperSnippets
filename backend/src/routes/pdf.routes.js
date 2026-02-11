import express from "express";
import { generatePDF, modifyConfiguration, createConfiguration } from "../controllers/pdf.controller.js";
const router = express.Router();

router.post("/generate", generatePDF); // Generate PDF from configuration
router.post("/modify", modifyConfiguration); // Update the configuration
router.post("/create", createConfiguration); // Create a new configuration

export default router;
