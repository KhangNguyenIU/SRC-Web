import { AppDataSource } from "@config/database.config";
import { Logger } from "@config/logger.config";
import { Conversation } from "@entities/conversation.entity";
import { Message } from "@entities/message.entity";
import { User } from "@entities/user.entity";
import { MESSAGE_TYPE } from "@enums";
import { MessageService } from "@services/message.service";
import { Request, Response} from 'express'
class MessageController {
    private static instance : MessageController;

    private constructor() {}

    static get() : MessageController {
        if (!MessageController.instance) {
            MessageController.instance = new MessageController();
        }
        return MessageController.instance; 
    }

    async createMessage(req: Request, res: Response) : Promise<Response<string | any>> {
        try {
            const { content, conversationId, messageType } = req.body as unknown as { content: string, conversationId: number, messageType: MESSAGE_TYPE };

            const userId = req.user.id;
            
            const newMessage = await  MessageService.createMessage(content, conversationId, messageType, userId);
            if(!newMessage) {
                return res.status(400).send('Error occurs when create message');
            }

            return res.status(200).json({ message: 'Create new message success', newMessage });
        } catch (error) {
            Logger.log('error', error);
            return res.status(400).send('Error occurs when create message');
        }
    }
}

const messageController = MessageController.get()

export { messageController as MessageController}