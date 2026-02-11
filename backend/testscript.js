import "dotenv/config";
import mongoose from "mongoose";
import { removeCollaboratorFromCodebook } from "./src/services/pdf.service.js";

const MONGODB_URI = process.env.MONGO_URI; 

async function runTest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Run test function
    const result = await removeCollaboratorFromCodebook(
      "698cfca337fb8abaa77fdebe", 
      "64a1f8e5c9e77b001d2b3c5f"
    );

    console.log("Updated Codebook:", result);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();