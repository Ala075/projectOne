import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    reference: {
      type: String,
      unique: true,
      required: [true, "Reference is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    images: {
      type: Array,
      //required: [true, "Image is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price must be at least 0."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
