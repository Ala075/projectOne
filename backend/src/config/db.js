import { config } from "dotenv";
import mongoose from "mongoose";

config();
const db_url = process.env.DB_URL;

const Connect_DB = async () => {
  try {
    const db = await mongoose.connect(db_url);
    console.log("Connected to the database");
    return db
  } catch (error) {
    console.log("Failed to connect db: => ", error.message);
  }
};

export default Connect_DB;