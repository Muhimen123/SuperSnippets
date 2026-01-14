import express from "express";
import pdfRoutes from "./pdf.routes.js"

const router = express.Router();
router.use("/pdf", pdfRoutes);

export default router;