import { Router } from 'express';
import validate from '../middleware/validate.js';
import commentsSchema from '../schemas/comments.js';
import checkToken from '../middleware/checkToken.js';
import commentsController from '../controller/comments.controller.js';

const router = Router();

router.post('/:reviewId/comments',checkToken, validate(commentsSchema.createComments, 'body'), commentsController.createComments);
router.get('/:reviewId/comments',checkToken, validate(commentsSchema.getComments, 'params'), commentsController.getComments);

export default router;