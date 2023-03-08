import * as Joi from 'joi';

const createUserSchema = {
    body : Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        interest: Joi.number().required(),
        mean: Joi.string().required(),
        school: Joi.string().required(),
        location: Joi.string().required(),
    })
}

export { createUserSchema}