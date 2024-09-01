import { Router } from 'express';
import usersSchema from '../schemas/users.js';
import validate from '../middleware/validate.js';
import controller from '../controller/users.controller.js';

const router = Router();

router.post('/registration', validate(usersSchema.registration, 'body'), controller.registration);
router.post('/login', validate(usersSchema.login, 'body'), controller.login);

export default router;