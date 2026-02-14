import mongoose from "mongoose";
import CodeSegment from "./CodeSegments.js";

const ActivitySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    codebook_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Codebook",
      required: true,
    },
    codesegment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodeSegment",
      required: true,
    },
    previous_codesegment: CodeSegment.schema,
    new_codesegment: CodeSegment.schema,
    action_type: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model("Activity", ActivitySchema);

export default Activity;
