import Joi from "joi";

export default {
    createReview: Joi.object({
        review: Joi.string().trim().min(3).max(5000).required(),
        rating: Joi.number().integer().min(1).max(5).positive().required(),
    }),

    getReviews: Joi.object({
        page: Joi.number().integer().min(1).max(100000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
        orderBy: Joi.string().valid('createdAt', 'updatedAt').default('createdAt').optional(),
    }),

    updateReview: Joi.object({
        newReview: Joi.string().trim().min(3).max(5000).required(),
        newRating: Joi.number().integer().min(1).max(5).positive().required(),
    }),

    deleteReviews: Joi.object({
        reviewId: Joi.number().integer().positive().required(),
    }),
}