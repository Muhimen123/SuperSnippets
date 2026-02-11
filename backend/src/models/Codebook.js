import mongoose from "mongoose";
import Configuration from "./Configuration.js";
import CodeSegment from "./CodeSegments.js";
import Category from "./Category.js";

const codebookSchema = new mongoose.Schema(
  {
    codebook_name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    configuration: Configuration.schema,
    codeSegments: [CodeSegment.schema],
    categories: [Category.schema],
    repositories: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Codebook = mongoose.model("Codebook", codebookSchema);

export default Codebook;
