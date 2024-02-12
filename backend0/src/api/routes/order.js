// orderRoutes.js

import express from "express";
import bodyParser from "body-parser";
import * as orderController from "../controllers/orderController.js";
import { requireAuth } from "../middlewares/authToken.js";

const orderRouter = express.Router();
//Middleware
orderRouter.use(bodyParser.json());

orderRouter.get("/:id", requireAuth, orderController.getOrderById);
orderRouter.get("/", requireAuth,orderController.getAllOrders);
orderRouter.post("/", requireAuth, orderController.createOrder);
orderRouter.patch("/:id", requireAuth, orderController.updateOrderById);
orderRouter.delete("/:id", requireAuth, orderController.deleteOrderById);

export default orderRouter;