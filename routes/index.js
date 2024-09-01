import { Router } from "express";
import users from './users.js';
import books from "./books.js";

const router = Router();

router.use('/users', users);
router.use('/books', books);

export default router;