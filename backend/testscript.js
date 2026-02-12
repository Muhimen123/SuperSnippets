import "dotenv/config";
import mongoose from "mongoose";
import { removeCodebook } from "./src/services/pdf.service.js";

const MONGODB_URI = process.env.MONGO_URI; 

async function runTest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Run test function
    const result = await removeCodebook("698e31dcaf49d7a1bec73eec");
    console.log("Removed codebook:", result);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();