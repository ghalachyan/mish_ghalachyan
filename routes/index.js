import { Router } from "express";
import users from './users.js';
import books from "./books.js";
import reviews from "./reviews.js";
import admin from "./admin.js";

const router = Router();

router.use('/users', users);
router.use('/books', books);
router.use('/reviews', reviews);
router.use('/admin', admin);

export default router;