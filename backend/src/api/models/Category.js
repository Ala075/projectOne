import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    image: {
      type: String,
      //required: [true, "Image is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
