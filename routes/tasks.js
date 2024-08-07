import express from 'express';
import userSchema from '../schemas/tasks.js';
import validate from '../middlewares/validate.js';
import checkToken from '../middlewares/checkToken.js';
import controller from '../controllers/tasksController.js';

const router = express.Router();

router.post('/create', checkToken, validate(userSchema.createTask, 'body'), controller.createTask);
router.get('/list', checkToken, controller.getTasksList);
router.get('/single/:userId', checkToken, validate(userSchema.getTask, 'params'), controller.getTask);
router.put('/update', checkToken, validate(userSchema.updateTask, 'body'), controller.updateTask);
router.delete('/delete/:userId', checkToken, validate(userSchema.deleteTask, 'params'), controller.deleteTask);



export default router;
