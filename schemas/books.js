import Joi from 'joi';

export default {
    createBook: Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        author: Joi.string().trim().min(3).max(100).required(),
    }),

    bookCategory: Joi.object({
        bookId: Joi.number().integer().min(1).max(20).required(),
        categoryId: Joi.number().integer().min(1).max(20).required(),
    }),

    getBooks: Joi.object({
        page: Joi.number().integer().min(1).max(10000000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
        orderBy: Joi.string().valid('createdAt', 'updatedAt').default('createdAt').optional(),
    }),

    // searchBook: Joi.object({
    //     title: Joi.string().trim().min(3).max(100).required(),
    //     author: Joi.string().trim().min(3).max(100).required(),
    // }),
}