import Reviews from '../models/Reviews.js';
import Books from '../models/Books.js';
import Users from '../models/Users.js';

export default {
    async createReview(req, res) {
        try {
            const { id: userId } = req.user;
            const { bookId } = req.params;
            const { review, rating } = req.body;

            const bookExists = await Books.findByPk(bookId);

            if (!bookExists) {
                res.status(404).json({
                    message: 'Book not found',
                })
                return;
            };

            const newReview = await Reviews.create({
                review,
                rating,
                userId,
                bookId
            });

            if (newReview) {
                res.status(201).json({
                    message: 'Review submitted successfully.',
                    newReview,
                })
                return;
            }

            res.status(400).json({
                message: 'Failed to submit review.',
            });


        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async getReviews(req, res) {
        try {
            let page = 1;
            let limit = 10;
            const { bookId } = req.params;

            const bookExists = await Books.findByPk(bookId);

            if (!bookExists) {
                res.status(404).json({
                    message: 'Book not found',
                })
                return;
            };

            const reviews = await Reviews.findAll({
                where: {
                    bookId
                },
                include: [
                    {
                        model: Books,
                        attributes: ['id', 'title', 'author']
                    },
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

            if (reviews.length > 0) {
                res.status(200).json({
                    message: 'Reviews retrieved successfully',
                    reviews
                });
                return;
            }

            res.status(404).json({
                message: 'No reviews found',
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}