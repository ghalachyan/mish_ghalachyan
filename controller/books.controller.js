import Books from '../models/Books.js';
import Users from '../models/Users.js';

export default {
    async createBook(req, res) {
        try {
            const { id: userId } = req.user;
            const { title, author } = req.body;

            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                res.status(404).json({
                    message: 'User not found.',
                })
                return;
            };

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
            let page = 1;
            let limit = 10;

            const books = await Books.findAll({
                include: [
                    {
                        model: Users,
                        attributes: ['id', 'userName', 'email']
                    }
                ],
                order: [
                    ['createdAt', 'Desc']
                ],
                offset: (page - 1) * limit,
                limit,
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