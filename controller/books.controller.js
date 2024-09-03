import Books from '../models/Books.js';
import Users from '../models/Users.js';
import Category from '../models/Category.js';
import BookCategory from "../models/BookCategory.js";

export default {
    async createBook(req, res) {
        try {
            const {id: userId} = req.user;
            const {title, author} = req.body;
            const categoryId = req.params.categoryId;

            const categoryExists = await Category.findByPk(categoryId);
            const userExists = await Users.findByPk(userId);
            const books = await Books.findOne({
                where: {
                    title: title,
                }
            });

            if (!userExists) {
                res.status(404).json({
                    message: 'User not found.',
                })
                return;
            }

            if (books) {
                res.status(404).json({
                    message: 'Title must be unique.',
                })
                return;
            }

            if (!categoryExists) {
                res.status(404).json({
                    message: 'Category not found.',
                })
                return;
            }


            const newBook = await Books.create({
                title,
                author,
                userId,
            });

            const [bookCategory, created] = await BookCategory.findOrCreate({
                where: {bookId: newBook.id, categoryId},
            });

            if (newBook) {
                res.status(201).json({
                    message: 'Book created successfully.',
                    newBook,
                    bookCategory,
                })
                return;
            }

            res.status(400).json({
                message: 'Failed to create book.',
            });

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error.',
                error: e.message,
            });
        }
    },

    async getBooks(req, res) {
        try {
            const {id: userId} = req.user;
            const total = await Books.count();

            const order = req.query.order;
            const orderBy = req.query.orderBy;
            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;

            const maxPageCount = Math.ceil(total / limit)

            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                res.status(404).json({
                    message: 'User not found.',
                })
                return;
            }

            if (page > maxPageCount) {
                res.status(404).json({
                    massage: 'Book does not found.',
                });
                return;
            }

            const books = await Books.findAll({
                include: [
                    {
                        model: Users,
                    }
                ],
                offset,
                limit,
                order: [
                    [orderBy, order]
                ],
            });

            if (books.length > 0) {
                res.status(200).json({
                    message: 'Books retrieved successfully',
                    books
                });
                return;
            }

            res.status(404).json({
                message: 'No books found',
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

}