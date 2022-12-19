import * as Joi from 'joi';

export const createPhoneSchema = {
  body: Joi.object({
    phone: Joi.string().required(),
    facultyId: Joi.number().required(),
  }),
};
