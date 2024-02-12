import mongoose from "mongoose";

const { Schema } = mongoose;

const ingrediantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Price must be a positive number."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    images: {
      type: Array,
      default: ["https://via.placeholder.com/150"],
    },
  },
  { timestamps: true }
);

const Ingrediant = mongoose.model("Ingrediant", ingrediantSchema);
export default Ingrediant;