import Joi from 'joi';

export default {
    addCategory: Joi.object({
        name: Joi.string().trim().min(2).max(20).required(),
    }),

    getUsers: Joi.object({
        page: Joi.number().integer().min(1).max(100000000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
        orderBy: Joi.string().valid('createdAt', 'updatedAt').default('createdAt').optional(),
    }),

    deleteUser: Joi.object({
        userId: Joi.number().integer().min(1).max(20).required(),
    }),

    deleteReview: Joi.object({
        reviewId: Joi.number().integer().min(1).max(20).required(),
    })
}