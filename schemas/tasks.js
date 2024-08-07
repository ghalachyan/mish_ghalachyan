import Joi from "joi";

export default {
    createTask: Joi.object({
        userId: Joi.number().integer().positive().required(),
        title: Joi.string().trim().min(3).max(100),
        description: Joi.string().trim().min(3).max(5000),
        taskDate: Joi.date().min('now')
            .custom((value, helpers) => {
                const currentDate = new Date();
                const inputDate = new Date(value);

                if (currentDate > inputDate) {
                    return helpers.message('Task date must be in the future');
                }

                return value;
            })
    }),
    getTask: Joi.object({
        userId: Joi.number().integer().positive().required(),
    }),
    updateTask: Joi.object({
        userId: Joi.number().integer().positive().required(),
        title: Joi.string().trim().min(3).max(100),
        description: Joi.string().trim().min(3).max(5000),
        taskDate: Joi.date().min('now')
            .custom((value, helpers) => {
                const currentDate = new Date();
                const inputDate = new Date(value);

                if (currentDate > inputDate) {
                    return helpers.message('Task date must be in the future');
                }

                return value;
            })
    }),
    deleteTask: Joi.object({
        userId: Joi.number().integer().positive().required(),
    })
}