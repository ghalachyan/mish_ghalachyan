import {Router} from 'express';
import usersSchema from '../schemas/users.js';
import validate from '../middleware/validate.js';
import reviewsSchema from "../schemas/reviews.js";
import checkFile from "../middleware/fileUpload.js";
import checkToken from "../middleware/checkToken.js";
import favoritesSchema from '../schemas/favorites.js';
import usersController from '../controller/users.controller.js';
import reviewsController from "../controller/reviews.controller.js";
import favoritesController from "../controller/favorites.controller.js";

const router = Router();

router.post(
    '/registration',
    checkFile('public/avatar').single('avatar'),
    validate(usersSchema.registration, 'body'),
    usersController.registration
);

router.post(
    '/login',
    validate(usersSchema.login, 'body'),
    usersController.login
);

router.put(
    '/update',
    checkToken,
    checkFile('public/avatar').single('avatar'),
    validate(usersSchema.update, 'body'),
    usersController.update
);

router.get('/:userId/favorites', checkToken, validate(favoritesSchema.getFavorites, 'params'), favoritesController.getFavorites);
router.get('/:userId/review-summary', checkToken, validate(usersSchema.getReviewSummary, 'params'), usersController.getReviewSummary);
router.get('/most-active', checkToken, validate(usersSchema.mostActive, 'query'), usersController.getActiveReviewers);

router.put('/update/:reviewId', checkToken, validate(reviewsSchema.updateReview, 'body'), reviewsController.updateReviews);

router.delete('/delete/:reviewId', checkToken, validate(reviewsSchema.deleteReviews, 'params'), reviewsController.deleteReviews);

export default router;