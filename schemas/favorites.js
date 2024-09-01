import Joi from 'joi';

export default {
    markFavorite: Joi.object({
        bookId: Joi.number().integer().positive().required(),
    }),

    getFavorites: Joi.object({
        userId: Joi.number().integer().positive().required(),
    }),
}