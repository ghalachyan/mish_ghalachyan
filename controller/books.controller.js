import Books from '../models/Books.js';
import Users from '../models/Users.js';

export default {
    async createBook(req, res) {
        try {
            const {id: userId} = req.user;
            const {title, author} = req.body;

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

            const newBook = await Books.create({
                title,
                author,
                userId,
            });

            if (newBook) {
                res.status(201).json({
                    message: 'Book created successfully.',
                    newBook,
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
            const total = await Books.count();

            const order = req.query.order;
            const  orderBy = req.query.orderBy;
            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;

            const maxPageCount = Math.ceil(total / limit)

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
                order:[
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