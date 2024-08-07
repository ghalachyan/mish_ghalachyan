import express from 'express';
import userSchema from '../schemas/users.js';
import validate from '../middlewares/validate.js';
import checkToken from '../middlewares/checkToken.js';
import controller from '../controllers/usersController.js'

const router = express.Router();

router.post('/register', validate(userSchema.registration, 'body'), controller.registration);
router.post('/login', validate(userSchema.login, 'body'), controller.login);
router.get('/list', checkToken, controller.getUsersList);
router.get('/profile/:id', checkToken, validate(userSchema.getUserProfile, 'params'), controller.getUserProfile);
router.put('/update', checkToken, validate(userSchema.updateUserProfile, 'body'), controller.updateUserProfile)
router.delete('/delete/:id', checkToken, validate(userSchema.deleteProfile, 'params'), controller.deleteProfile);

export default router;