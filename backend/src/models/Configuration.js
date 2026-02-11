import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({
  margin: {
    type: Number,
    default: 1,
  },
  header_text: {
    type: String,
    default: "",
  },
  column_number: {
    type: Number,
    default: 1,
  },
  page_number: {
    type: Number,
    default: 20,
  },
  font_size: {
    type: Number,
    default: 12,
  },
  font_family: {
    type: String,
    default: "Arial",
  },
	orientation: {
		type: String,
		enum: ["portrait", "landscape"],
		default: "landscape",
	},
});

const Configuration = mongoose.model("Configuration", configurationSchema);

export default Configuration;
