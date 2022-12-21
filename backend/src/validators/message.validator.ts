import { MESSAGE_TYPE } from '@enums'
import * as Joi from 'joi'

export const createMessageSchema ={
    body : Joi.object({
        content : Joi.string().required(),
        conversationId : Joi.number().required(),
        messageType : Joi.string().valid(...Object.values(MESSAGE_TYPE))
    })
}