import Joi from 'joi';

export default {
    createComments: Joi.object({
        content: Joi.string().trim().min(3).max(500).required(),
    }),

    getComments: Joi.object({
        reviewId: Joi.number().integer().positive().required(),
    }),
}