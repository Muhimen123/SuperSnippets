import mongoose from "mongoose";

const CodeSegmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: [String],
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
      enum: ["local", "github"],
      required: true,
    },
    file_url: {
      type: String,
    },
  },
);

const CodeSegment = mongoose.model("CodeSegment", CodeSegmentSchema);

export default CodeSegment;
