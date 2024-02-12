import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    reference: {
      type: String,
      unique: true,
      required: [true, "Reference is required."],
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      default: "pending",
    },
    expiredAt: {
      type: Date,
      default: Date.now() + 60 * 60 * 1000, // 1 hour
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required."],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required."],
          min: [1, "Quantity must be at least 1."],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "Total is required."],
      min: [0, "Total must be at least 0."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
