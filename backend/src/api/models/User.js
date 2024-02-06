import mongoose from "mongoose";
import validator from "validator";
import { hashData, InhashData } from "../helpers/hashData.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    role: {
      type: Number,
      enum: [1000, 2000, 3000, 4000, 5000, 7000, 9000],
      default: 1000,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hashData(this.password);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    try {
      this._update.password = await hashData(this._update.password);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (user) {
      const auth = await InhashData(password, user.password);

      if (auth) {
        return user;
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
