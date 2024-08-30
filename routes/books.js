import { Router } from 'express';
import bookSchema from '../schemas/books.js';
import reviewSchema from '../schemas/reviews.js';
import validate from '../middleware/validate.js';
import checkToken from '../middleware/checkToken.js';
import booksController from '../controller/books.controller.js';
import reviewsController from '../controller/reviews.controller.js';

const router = Router();

router.post('/create', checkToken, validate(bookSchema.createBook, 'body'), booksController.createBook);
router.get('/list', checkToken, booksController.getBooks);

router.post('/:bookId/reviews', checkToken,validate(reviewSchema.createReview, 'body'), reviewsController.createReview);
router.get('/:bookId/reviews', checkToken,validate(reviewSchema.getReviews, 'params'), reviewsController.getReviews);

export default router;