import "dotenv/config";
import app from "./src/app.js";
import SuperSnippetsDB from "./src/config/db.js";

SuperSnippetsDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`\n=== Listening on: http://localhost:${PORT} ===\n`);
});
