// loginController.js
import User from "../models/User.js";
import { config } from "dotenv";
import createToken from "../helpers/createToken.js";

config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password must be provided." });
  }

  try {
    const findUser = await User.login(email, password);

    if (!findUser) {
      console.log(email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found!");
    const token = createToken(findUser._id);

    /*res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
    });*/

    console.log("Finded Successfully!");
    
    const { password, ...userWithoutPass } = findUser.toObject();
    res.status(200).json({ user: userWithoutPass._id, token });
  } catch (error) {
    if (error.message.includes("User not found")) {
      return res
        .status(404)
        .json({ message: "No account associated with this email." });
    } else if (error.message.includes("Incorrect password")) {
      return res.status(400).json({ message: "Password is incorrect." });
    }  else {
      // Handle any other errors that are not anticipated
      console.error("Login error:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred during the login process." });
    }
  }
};

export { loginUser };
