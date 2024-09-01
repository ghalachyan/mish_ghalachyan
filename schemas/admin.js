import Joi from 'joi';

export default {
    addCategory: Joi.object({
        name: Joi.string().trim().min(2).max(20).required(),
    }),
}