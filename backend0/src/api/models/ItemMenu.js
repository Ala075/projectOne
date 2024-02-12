import mongoose from "mongoose";

const { Schema } = mongoose;

const itemMenuSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: [true, "Ingredient is required."],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be a positive number."],
        },
      },
    ],
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

const ItemMenu = mongoose.model("ItemMenu", itemMenuSchema);
export default ItemMenu;
