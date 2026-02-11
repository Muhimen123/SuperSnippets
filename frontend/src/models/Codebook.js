import mongoose from "mongoose";
import Configuration from "./Configuration";
import CodeSegment from "./CodeSegments";
import Category from "./Category";

const codebookSchema = new mongoose.Schema({
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
});

const Codebook = mongoose.model("Codebook", codebookSchema);

export default Codebook;
