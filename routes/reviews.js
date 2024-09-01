import {Router} from 'express';
import reviewsSchema from '../schemas/reviews.js';
import validate from '../middleware/validate.js';
import checkToken from '../middleware/checkToken.js';
import controller from '../controller/reviews.controller.js';

const router = Router();

router.post('/:bookId/reviews', checkToken, validate(reviewsSchema.createReview, 'body'), controller.createReview);
router.get('/:bookId/reviews', checkToken,validate(reviewsSchema.getReviews, 'query'), controller.getReviews);
router.put('/update/:reviewId',checkToken, validate(reviewsSchema.updateReview, 'body'), controller.updateReviews);
router.delete('/delete/:reviewId',checkToken, validate(reviewsSchema.deleteReviews, 'params'), controller.deleteReviews);

export default router;