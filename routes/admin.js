import { Router } from 'express';
import validate from '../middleware/validate.js';
import adminSchema from '../schemas/admin.js';
import checkToken from '../middleware/checkToken.js';
import adminController from '../controller/admin.controller.js';

const router = Router();

router.post('/categories',checkToken, validate(adminSchema.addCategory, 'body'), adminController.addCategory);

export default router;