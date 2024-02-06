// logoutRoutes.js

import express from "express";
import goOut from "../controllers/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.get("/",goOut);
logoutRouter.post("/",goOut);

export default logoutRouter;

