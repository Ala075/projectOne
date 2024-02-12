import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    images: {
      type: Array,
      default: ["https://via.placeholder.com/150"],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    contact: {
      type: String,
      required: [true, "Contact is required."],
    },
    workingHours: {
      type: String,
      required: [true, "Working hours is required."],
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
