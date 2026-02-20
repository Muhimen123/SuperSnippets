import express from "express";
import pdfRoutes from "./pdf.routes.js";
import githubRoutes from "./github.routes.js";
import authRoutes from "./auth.routes.js";
import emailRoutes from "./email.routes.js";
import notificationRoutes from "./notification.routes.js";
import activityRoutes from "./activity.routes.js";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/pdf", pdfRoutes);
router.use("/github", githubRoutes);
router.use("/email", emailRoutes);
router.use("/notifications", notificationRoutes);
router.use("/activities", activityRoutes);

export default router;
