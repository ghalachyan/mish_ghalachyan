import { Router } from 'express';
import userSchema from '../schemas/users.js';
import validate from '../middleware/validate.js';
import controller from '../controller/users.controller.js';

const router = Router();

router.post('/registration', validate(userSchema.registration, 'body'), controller.registration);
router.post('/login', validate(userSchema.login, 'body'), controller.login);

export default router;