import * as Joi from 'joi';

const CreatePostSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    keywords: Joi.string().required(),
    year: Joi.number().required(),
    categoryId: Joi.number().required(),
  }),
};

const DeletePostSchema = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
}

export { CreatePostSchema , DeletePostSchema };
