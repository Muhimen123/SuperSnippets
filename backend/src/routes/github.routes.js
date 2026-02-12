import express from "express";
import { getFileContent, getRepoFiles } from "../controllers/github.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GitHub routes require authentication
router.post("/fetch", verifyToken, getRepoFiles); // Fetches all the files under a repository
router.post("/file", verifyToken, getFileContent); // Fetches the content of a single file

export default router;
