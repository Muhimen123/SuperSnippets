import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  const currentDate = new Date();

  res.status(200).json({
    message: "Server is up and running!",
    serverClock: currentDate.toString(),
  });
});

app.listen(PORT, () => {
  console.log(`\n=== Listening on: http://localhost:${PORT} ===\n`);
});
