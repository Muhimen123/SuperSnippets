import express from "express";

const router = express.Router();

router.get("/welcome", getRepoFiles); // Send welcome message to the new user

export default router;
