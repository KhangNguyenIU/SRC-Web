import * as Joi from 'joi';

const createUserSchema = {
    body : Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

export { createUserSchema}