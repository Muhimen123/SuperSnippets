import express from "express";
import { parseCode } from "../controllers/parser.controller.js";

const router = express.Router();

router.post("/", parseCode);

export default router;