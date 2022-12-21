import { AppDataSource } from "@config/database.config";
import { Logger } from "@config/logger.config";
import { Conversation } from "@entities/conversation.entity";
import { Message } from "@entities/message.entity";
import { User } from "@entities/user.entity";
import { MESSAGE_TYPE } from "@enums";
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
            
            const ConversationRepo = await AppDataSource.getRepository(Conversation);
            const UserRepo = await AppDataSource.getRepository(User);
            const MessageRepo = await AppDataSource.getRepository(Message);
            const user = await UserRepo.findOneBy({ id: userId });
            const conversation = await ConversationRepo.findOneBy({ id: conversationId });
            const newMessage = new Message();
            newMessage.content = content;
            newMessage.conversation = conversation;
            newMessage.postedBy = user;
            newMessage.type = messageType;
            await AppDataSource.manager.save(newMessage);
            return res.status(200).json({ message: 'Create new message success', newMessage });
        } catch (error) {
            Logger.log('error', error);
            return res.status(400).send('Error occurs when create message');
        }
    }
}

const messageController = MessageController.get()

export { messageController as MessageController}