import * as Joi from 'joi'

export const createEmailSchema ={
    body : Joi.object({
        email : Joi.string().email().required(),
        facultyId : Joi.number().required()
    })
}