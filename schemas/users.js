import Joi from 'joi';

export default {
    registration: Joi.object({
        userName: Joi.string().trim().min(2).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(16).required(),
    }),

    login: Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(16).required()
    }),

    getReviewSummary: Joi.object({
        userId: Joi.number().integer().positive().required(),
    }),

    mostActive: Joi.object({
        page: Joi.number().integer().min(1).max(1000000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
    }),
}