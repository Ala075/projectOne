// sigupRoutes.js

import express from "express";
import cookieParser from "cookie-parser";
import * as sigupController from "../controllers/signupController.js";

const sigupRouter = express.Router();
sigupRouter.use(cookieParser());

sigupRouter.post("/",sigupController.addUser);

export default sigupRouter;
