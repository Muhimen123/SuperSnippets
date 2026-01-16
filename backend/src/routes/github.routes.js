import express from "express";
import { getRepoFiles } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/fetch", getRepoFiles);

export default router;
