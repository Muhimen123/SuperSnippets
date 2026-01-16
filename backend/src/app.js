import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.js";
import githubRoutes from "./routes/githubRoutes.js";

const app = express();

app.use(cors());
//app.use(json());
app.use("/api", allRoutes);
// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json());

// Routes
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("SuperSnippets Backend API is running");
});

export default app;
