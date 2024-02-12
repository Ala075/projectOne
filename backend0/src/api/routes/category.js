//categoryRouter.js

import express from 'express';
import bodyParser from 'body-parser';
import * as categoryController from '../controllers/categoryController.js';
import { requireAuth } from "../middlewares/authToken.js";
import { uploadOne } from '../middlewares/upload.js';

const categoryRouter = express.Router();
//Middleware
categoryRouter.use(bodyParser.json());

categoryRouter.get('/', requireAuth, categoryController.getAllCategories);
categoryRouter.get('/:id', requireAuth, categoryController.getCategoryById);
categoryRouter.post('/', requireAuth, uploadOne, categoryController.createCategory);
categoryRouter.patch('/:id', requireAuth, uploadOne, categoryController.updateCategoryById);
categoryRouter.delete('/:id', requireAuth, categoryController.deleteCategoryById);

export default categoryRouter;
