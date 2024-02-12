import User from "../models/User.js";

const authAdmin = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found !" });
    }

    const userRole = user.role;
    if ([7000, 9000].includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied !" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authManager = async (req, res, next) => {
  const userId = req.body.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRole = user.role;
    if (userRole === "manager") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "server error" });
  }
};

export { authAdmin, authManager };
