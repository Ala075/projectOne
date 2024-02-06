// loginRoutes.js

import express from "express";
import * as loginController from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.get("/",loginController.loginUser);
loginRouter.post("/",loginController.loginUser);

export default loginRouter;