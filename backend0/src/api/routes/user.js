// userRoutes.js

import express from "express";
import bodyParser from "body-parser";
import * as userController from "../controllers/userController.js";
import { authAdmin } from "../middlewares/authRes.js";
import { requireAuth } from "../middlewares/authToken.js";
import { uploadOne } from "../middlewares/upload.js";

const userRouter = express.Router();
//Middleware
userRouter.use(bodyParser.json());

// METHOD FOR USER
userRouter.get("/:id", requireAuth, userController.getUserById);
userRouter.patch("/:id", requireAuth, userController.updateUserById);
userRouter.patch("/:id/image", requireAuth, uploadOne, userController.updateProfileImage);

// METHOD FOR ADMIN
userRouter.get("/", requireAuth, authAdmin, userController.getAllUsers);
userRouter.post("/", requireAuth, authAdmin, uploadOne, userController.createUser);
userRouter.delete("/:id", requireAuth, authAdmin, userController.deleteUserById);

export default userRouter;
