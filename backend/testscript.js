import "dotenv/config";
import mongoose from "mongoose";
import { logActivity } from "./src/services/activity.service.js";

const MONGODB_URI = process.env.MONGO_URI; 

async function runTest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Run test function

    const prevCodesegment = {
      title: "Old Code Segment",
      code: "console.log('Hello, World!');",
    };

    const newCodesegment = {
      title: "Updated Code Segment",
      code: "console.log('Hello, something something!');",
    };

    await logActivity({
      userId: "698cb24b1a1c86f156b1ec06",
      codebookId: "698e2d343b5d0087a13e06c9",
      codesegmentId: "64b8ca1fe1b2c3d4e5f67892",
      previousCodesegment: prevCodesegment,
      newCodesegment: newCodesegment,
      actionType: "UPDATE",
    });

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();