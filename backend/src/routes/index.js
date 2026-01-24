import express from "express";
import pdfRoutes from "./pdf.routes.js";
import githubRoutes from "./github.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/pdf", pdfRoutes);
router.use("/github", githubRoutes);

export default router;
