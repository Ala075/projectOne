import mongoose from "mongoose";

const { Schema } = mongoose;

const saleSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      unique: true,
      required: [true, "Order is required."],
    },
    total: {
      type: Number,
      required: [true, "Total is required."],
      min: [0, "Total must be a positive number."],
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
