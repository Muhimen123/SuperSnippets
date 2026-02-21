import mongoose from "mongoose";

const CategoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: Number,
      required: true,
    },
    included: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: Number,
      required: true,
    },
    items: [{}],
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
