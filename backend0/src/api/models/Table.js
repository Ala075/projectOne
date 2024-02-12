import mongoose from "mongoose";

const { Schema } = mongoose;

const tableSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: [true, "tableNumber is required."],
      unique: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required."],
      min: [1, "Capacity must be a positive number."],
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "reserved"],
      default: "unavailable",
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
export default Table;
