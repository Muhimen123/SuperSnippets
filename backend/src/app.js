import express from "express";
import cors from "cors";
import githubRoutes from "./routes/githubRoutes.js";

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json());

// Routes
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("SuperSnippets Backend API is running");
});

export default app;
