// userController.js
import User from "../models/User.js";

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = id && (await User.findById(id));

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Finded Successfully!");
    const { password, ...user } = findUser.toObject();
    res.status(200).json({ user });
  } catch (error) {
    // This block will handle errors thrown by Mongoose if the ID format is incorrect
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Returned All Users Successfully!");
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    });
    res.status(200).json({ users: usersWithoutPassword});
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "error.message" });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log("data", updateData);

  try {
    const updatedUser =
      id &&
      (await User.findOneAndUpdate(
        { _id: id },
        { ...updateData },
        {
          new: true,
        }
      ));

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated successfully");
    const { password, ...user } = updatedUser.toObject();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already in use.",
      });
    } else if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid email adress.",
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Update a user's profile image
const updateProfileImage = async (req, res) => {
  const { id } = req.params;
  const image = req.file.filename;

  if (!image) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  try {
    const updatedUser =
      id &&
      (await User.findOneAndUpdate(
        { _id: id },
        { image },
        {
          new: true,
        }
      ));

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated successfully");
    
    const { password, ...user } = updatedUser._doc; 
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = id && (await User.findByIdAndDelete(id));

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Removed Successfully!");
    res.status(200).json({ message: "Removed Successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new user
const createUser = async (req, res) => {
  const { name, email, password, image, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      image,
      role,
    });

    console.log("Added Successfully!");
    res
      .status(201)
      .json({ message: "Added Successfully!" /*, user: newUser*/ });
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already in use.",
      });
    } else if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid email adress.",
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export { getAllUsers, getUserById, updateUserById, updateProfileImage, deleteUserById, createUser };
