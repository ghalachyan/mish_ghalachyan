import { Router } from "express";
import users from './users.js';
import books from "./books.js";
import reviews from "./reviews.js";

const router = Router();

router.use('/users', users);
router.use('/books', books);
router.use('/reviews', reviews);

export default router;