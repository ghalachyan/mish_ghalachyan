import Joi from 'joi';

export default {
    registration: Joi.object({
        fName: Joi.string().trim().min(2).max(20).required(),
        lName: Joi.string().trim().min(2).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(16).required()
    }),
    login: Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(16).required()
    }),
    getUserProfile: Joi.object({
        id: Joi.number().integer().positive().required()
    }),
    updateUserProfile: Joi.object({
        id: Joi.number().integer().positive().required(),
        fName: Joi.string().trim().min(2).max(20).required(),
        lName: Joi.string().trim().min(3).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(16).required()
    }),
    deleteProfile: Joi.object({
        id: Joi.number().integer().positive().required(),
    })
}