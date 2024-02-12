import mongoose from "mongoose";

const { Schema } = mongoose;

const deliverySchema = new Schema(
  {
    reference: {
      type: String,
      unique: true,
      required: [true, "Name is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required."],
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order is required."],
    },
    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required."],
    },
    deliveryMan: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;
