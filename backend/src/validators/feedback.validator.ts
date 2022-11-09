import * as Joi from 'joi'

export const createFeedbackValidator = {
    body : Joi.object({
        comment : Joi.string(),
        rating : Joi.number().required().min(1).max(5)
    })
}

export const deleteFeedBackSchema ={
    params : Joi.object({
        id : Joi.number().required()
    })
}