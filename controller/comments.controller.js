import Comments from '../models/Comments.js';
import Users from "../models/Users.js";
import Reviews from "../models/Reviews.js";

export default {
    async createComments(req, res) {
        try {
            const userId = req.user.id;
            const reviewId = req.params.reviewId;
            const {content} = req.body;

            const user = await Users.findByPk(userId);
            const review = await Reviews.findByPk(reviewId);

            if (!user) {
                res.status(404).json({
                    message: 'User not found',
                });
                return;
            }

            if (!review) {
                res.status(404).json({
                    message: 'Review not found',
                });
                return;
            }

            const comment = await Comments.create({
                content,
                userId,
                reviewId,
            })

            res.status(201).json({
                message: 'Comment submitted successfully.',
                comment,
            })

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async getComments(req, res) {
        try {
            const userId = req.user.id;
            const reviewId = req.params.reviewId;

            const user = await Users.findByPk(userId);

            if (!user) {
                res.status(404).json({
                    message: 'User not found.',
                });
                return;
            }

            if (!reviewId) {
                res.status(404).json({
                    message: 'Review not found.',
                });
                return;
            }
            const comments = await Comments.findAll({
                where: {userId},
                include: [
                    {
                        model: Users,
                    }
                ]
            })
            res.status(200).json({
                user,
                comments,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}