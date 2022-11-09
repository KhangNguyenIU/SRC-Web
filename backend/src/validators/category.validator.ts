import * as Joi from 'joi'

const createCategorySchema = {
    body: Joi.object({
        name: Joi.string().required(),
    })
}

const updateCategorySchema = {
    body: Joi.object({
        name: Joi.string().required(),
    }),
    params: Joi.object({
        id: Joi.number().required(),
    })
}

const deleteCategorySchema = {
    params: Joi.object({
        id: Joi.number().required(),
    })
}

export { createCategorySchema, updateCategorySchema, deleteCategorySchema }