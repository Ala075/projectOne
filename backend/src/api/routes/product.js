//productRouter
import express from 'express';
import bodyParser from 'body-parser';
import * as productController from '../controllers/productController.js';
import { requireAuth } from "../middlewares/authToken.js";
import { uploadOne } from "../middlewares/upload.js";

const productRouter = express.Router();
//Middleware
productRouter.use(bodyParser.json());

productRouter.get('/', requireAuth, productController.getAllProducts);
productRouter.get('/:id', requireAuth, productController.getProductById);
productRouter.post('/', requireAuth, uploadOne, productController.createProduct);
productRouter.patch('/:id', requireAuth, uploadOne, productController.updateProductById);
productRouter.delete('/:id', requireAuth, productController.deleteProductById);

export default productRouter;
