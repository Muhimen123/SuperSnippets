import express from "express";
import { getFileContent, getRepoFiles, getAllRepoFiles} from "../controllers/github.controller.js";

const router = express.Router();

router.post("/fetch", getRepoFiles); // Fetches all the files under a repository
router.post("/file", getFileContent); // Fetches the content of a single file
router.post("/fetch-all", getAllRepoFiles); // Fetches all the files under a repository (same as /fetch, can be used for testing or future expansion)

export default router;
