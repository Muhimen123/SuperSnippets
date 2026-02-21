import "dotenv/config";
import mongoose from "mongoose";
import User from "./src/models/User.js";
import { fetchAllRepoFiles } from "./src/services/github.service.js";

const MONGODB_URI = process.env.MONGO_URI; 

async function runTest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Run test function
    const result = await fetchAllRepoFiles("https://github.com/ShahjalalShohag/code-library");
    console.log("Test result:", result);


  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();