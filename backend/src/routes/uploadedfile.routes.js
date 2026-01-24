import express from "express";
import multer from "multer";
import { processUploadedFiles } from "../controllers/uploadedfile.controller.js";

const router = express.Router();

// Memory storage allows us to access file.buffer in the controller
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 'files' must match the key used in FormData on the frontend
router.post("/upload", upload.array("files"), processUploadedFiles);

export default router;