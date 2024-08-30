import { Router } from 'express';
import bookSchema from '../schemas/books.js';
import validate from '../middleware/validate.js';
import checkToken from '../middleware/checkToken.js';
import controller from '../controller/books.controller.js';

const router = Router();

router.post('/create', checkToken, validate(bookSchema.createBook, 'body'), controller.createBook);

export default router;