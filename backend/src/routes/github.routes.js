import express from "express";
import { getFileContent, getRepoFiles } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/fetch", getRepoFiles); // Fetches all the files under a repository
router.post("/file", getFileContent); // Fetches the content of a single file

export default router;
