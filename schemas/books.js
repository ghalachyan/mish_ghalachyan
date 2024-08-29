import Joi from 'joi';

export default {
    create: Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        author: Joi.string().trim().min(3).max(100).required(),
    })
}