import express from "express";
import pdfRoutes from "./pdf.routes.js";
import githubRoutes from "./github.routes.js"
import uploadedFileRoutes from "./uploadedfile.routes.js";

const router = express.Router();
router.use("/pdf", pdfRoutes);
router.use("/github", githubRoutes);
router.use("/files", uploadedFileRoutes);

export default router;
