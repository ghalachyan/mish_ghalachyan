import { Router } from 'express';
import validate from '../middleware/validate.js';
import authorsSchema from '../schemas/authors.js';
import checkToken from '../middleware/checkToken.js';
import authorsController from '../controller/authors.controller.js';

const router = Router();

router.get('/book-count',checkToken,validate(authorsSchema.getUsers, 'query'),  authorsController.getBooksCount);

export default router;