import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    time: {
      type: String,
      required: [true, "Time is required."],
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required."],
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: [true, "Table is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Rervation = mongoose.model("Reservation", reservationSchema);
export default Rervation;
