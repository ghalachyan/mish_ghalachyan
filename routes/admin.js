import { Router } from 'express';
import validate from '../middleware/validate.js';
import adminSchema from '../schemas/admin.js';
import checkToken from '../middleware/checkToken.js';
import adminController from '../controller/admin.controller.js';

const router = Router();

router.post('/categories',checkToken, validate(adminSchema.addCategory, 'body'), adminController.addCategory);
router.get('/users',checkToken,validate(adminSchema.getUsers, 'query'),  adminController.getUsers);
router.delete('/users/:userId',checkToken,validate(adminSchema.deleteUser, 'params'),  adminController.deleteUser);
router.delete('/reviews/:reviewId',checkToken,validate(adminSchema.deleteReview, 'params'),  adminController.deleteReview);

export default router;