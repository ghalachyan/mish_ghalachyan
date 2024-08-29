import Joi from "joi";

export default {
    review:  Joi.string().trim().min(3).max(5000).required(),
    rating: Joi.number().integer().min(1).max(5).positive().required(),
}