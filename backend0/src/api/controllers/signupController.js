// signupController.js
import { config } from "dotenv";
import User from "../models/User.js";
import createToken from "../helpers/createToken.js";

config();
const maxAge = 3 * 24 * 60 * 60 * 1000;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name , email and password are required.",
    });
  }

  try {
    const newUser = new User({ name, email, password });

    const user = await newUser.save();

    console.log("Added Successfully!");
    const token = createToken(user._id);

    /*res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
    });*/

    res.status(200).json({ user: user._id, token });
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already in use.",
      });
    }else if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Invalid email adress."
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export { addUser };