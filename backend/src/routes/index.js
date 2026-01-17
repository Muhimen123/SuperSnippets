import express from "express";
import pdfRoutes from "./pdf.routes.js";
import githubRoutes from "./github.routes.js"

const router = express.Router();
router.use("/pdf", pdfRoutes);
router.use("/github", githubRoutes);

export default router;
