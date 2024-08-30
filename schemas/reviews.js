import Joi from "joi";

export default {
    createReview: Joi.object({
        review: Joi.string().trim().min(3).max(5000).required(),
        rating: Joi.number().integer().min(1).max(5).positive().required(),
    }),

    getReviews: Joi.object({
        bookId: Joi.number().integer().positive().required(),
    }),

    updateReview: Joi.object({
        newReview: Joi.string().trim().min(3).max(5000).required(),
        newRating: Joi.number().integer().min(1).max(5).positive().required(),
    }),
}