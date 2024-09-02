import { Router } from 'express';
import booksSchema from '../schemas/books.js';
import reviewsSchema from "../schemas/reviews.js";
import favoritesSchema from '../schemas/favorites.js';
import validate from '../middleware/validate.js';
import checkToken from '../middleware/checkToken.js';
import booksController from '../controller/books.controller.js';
import reviewsController from "../controller/reviews.controller.js";
import favoritesController from '../controller/favorites.controller.js';
import categoriesController from "../controller/categories.controller.js";

const router = Router();

router.post('/create', checkToken, validate(booksSchema.createBook, 'body'), booksController.createBook);
router.post('/:bookId/reviews', checkToken, validate(reviewsSchema.createReview, 'body'), reviewsController.createReview);
router.post('/:bookId/favorite', checkToken, validate(favoritesSchema.markFavorite, 'params'), favoritesController.markFavorite);
router.post('/:bookId/categories/:categoryId', checkToken, validate(booksSchema.bookCategory, 'params'), booksController.bookCategory);

router.get('/list', checkToken, validate(booksSchema.getBooks, 'query'), booksController.getBooks);
router.get('/:bookId/reviews', checkToken,validate(reviewsSchema.getReviews, 'query'), reviewsController.getReviews);
router.get('/categories', checkToken, categoriesController.getCategories);
// router.get('/search', checkToken, booksController.searchBooks);

export default router;