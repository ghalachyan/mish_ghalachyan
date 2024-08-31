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
            }

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
            const total = await Reviews.count();

            const order = req.query.order;
            const  orderBy = req.query.orderBy;
            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;

            const { bookId } = req.params;

            const maxPageCount = Math.ceil(total / limit)

            if (page > maxPageCount) {
                res.status(404).json({
                    massage: 'Review does not found.',
                });
                return;
            }

            const bookExists = await Books.findByPk(bookId);

            if (!bookExists) {
                res.status(404).json({
                    message: 'Book not found',
                })
                return;
            }

            const reviews = await Reviews.findAll({
                where: {
                    bookId
                },
                include: [
                    {
                        model: Books,
                    },
                    {
                        model: Users,
                        attributes: ['id', 'userName', 'email']
                    }
                ],
                offset,
                limit,
                order:[
                    [orderBy, order]
                ],
            });

            const reviewsRating = await Reviews.findAll()
            const ratings = reviewsRating.map(review =>  review.rating);

            let result = 0;

            for (let i = 0; i < ratings.length; i++) {
                result += ratings[i];
            }

            let ratingResult = result/ratings.length;

            if (reviews.length > 0) {
                res.status(200).json({
                    message: 'Reviews retrieved successfully',
                    reviews,
                    ratingResult
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
    },

    async updateReviews(req, res) {
        try {
            const { id: userId } = req.user;
            const { reviewId } = req.params;
            const { newReview, newRating } = req.body;

            const reviewsExists = await Reviews.findByPk(reviewId);

            if (!reviewsExists) {
                res.status(404).json({
                    message: 'Review not found',
                })
                return;
            }

            const updatedReview = await reviewsExists.update(
                {
                    review: newReview,
                    rating: newRating
                },
                {
                  where:{
                    userId,
                  }  
                }
            );

            res.status(200).json({
                message: 'Review updated successfully.',
                updatedReview
            })
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async deleteReviews(req, res) {
        const {id: userId} = req.user;
        const {reviewId} = req.params;

        const reviewToDelete = await Reviews.findByPk(reviewId);

        if(!reviewToDelete){
            res.status(404).json({
                message: 'Review not found.',
            });
            return
        }

        if(reviewToDelete.userId !== userId) {
            res.status(403).json({
                message: 'Unauthorized to delete this review.'
            });
            return;
        }

        await reviewToDelete.destroy();

        res.status(200).json({
            message: 'Review deleted successfully.'
        })
    }
}