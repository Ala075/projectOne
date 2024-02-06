// saleRoutes.js

import express from "express";
import bodyParser from "body-parser";
import * as saleController from "../controllers/saleController.js";
import { authAdmin } from "../middlewares/authRes.js";
import { requireAuth } from "../middlewares/authToken.js";

const saleRouter = express.Router();
//Middleware
saleRouter.use(bodyParser.json());

// METHOD FOR ADMIN
saleRouter.get("/:id", requireAuth, authAdmin, saleController.getSaleById);
saleRouter.get("/", requireAuth, authAdmin, saleController.getAllSales);
saleRouter.post("/", requireAuth, authAdmin, saleController.createSale);

export default saleRouter;
