import { Router } from 'express';
import userSchema from '../schemas/users.js';
import validate from '../middleware/validate.js';
import reviewsSchema from '../schemas/reviews.js';
import checkToken from '../middleware/checkToken.js';
import usersController from '../controller/users.controller.js';
import reviewsController from '../controller/reviews.controller.js';

const router = Router();

router.post('/registration', validate(userSchema.registration, 'body'), usersController.registration);
router.post('/login', validate(userSchema.login, 'body'), usersController.login);

router.put('/reviews/update/:reviewId',checkToken, validate(reviewsSchema.updateReview, 'body'), reviewsController.updateReviews);
router.delete('/reviews/delete/:reviewId',checkToken, validate(reviewsSchema.deleteReviews, 'params'), reviewsController.deleteReviews);

export default router;