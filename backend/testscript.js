import "dotenv/config";
import mongoose from "mongoose";
import { fetchAllCodebooksForUser } from "./src/services/pdf.service.js";

const MONGODB_URI = process.env.MONGO_URI; 

async function runTest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Run test function
    const result = await fetchAllCodebooksForUser("698cb24b1a1c86f156b1ec06");
    console.log("Test result:", result);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();