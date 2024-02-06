//categoryRouter.js

import express from 'express';
import bodyParser from 'body-parser';
import * as categoryController from '../controllers/categoryController.js';
import { requireAuth } from "../middlewares/authToken.js";

const categoryRouter = express.Router();
//Middleware
categoryRouter.use(bodyParser.json());

categoryRouter.get('/', requireAuth, categoryController.getAllCategories);
categoryRouter.get('/:id', requireAuth, categoryController.getCategoryById);
categoryRouter.post('/', requireAuth, categoryController.createCategory);
categoryRouter.patch('/:id', requireAuth, categoryController.updateCategoryById);
categoryRouter.delete('/:id', requireAuth, categoryController.deleteCategoryById);

export default categoryRouter;
