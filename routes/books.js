import { Router } from 'express';
import booksSchema from '../schemas/books.js';
import validate from '../middleware/validate.js';
import checkToken from '../middleware/checkToken.js';
import controller from '../controller/books.controller.js';

const router = Router();

router.post('/create', checkToken, validate(booksSchema.createBook, 'body'), controller.createBook);
router.get('/list', checkToken, validate(booksSchema.getBooks, 'query'), controller.getBooks);

export default router;