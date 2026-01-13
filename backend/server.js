import "dotenv/config";
import app from "./src/app.js"


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`\n=== Listening on: http://localhost:${PORT} ===\n`);
});
