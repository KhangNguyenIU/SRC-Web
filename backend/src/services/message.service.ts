import { AppDataSource } from "@config/database.config";
import { Conversation } from "@entities/conversation.entity";
import { Message } from "@entities/message.entity";
import { User } from "@entities/user.entity";
import { MESSAGE_TYPE } from "@enums"


class MessageService {
    private static instance : MessageService

    private constructor() {}

    static getInstance() : MessageService {
        if(!MessageService.instance) {
            MessageService.instance = new MessageService()
        }
        return MessageService.instance
    }

    async createMessage(content: string, chatRoom: number,messageType:  MESSAGE_TYPE, postedBy: number) {
        try {
            const ConversationRepo = await AppDataSource.getRepository(Conversation);
            const UserRepo = await AppDataSource.getRepository(User);
            const MessageRepo = await AppDataSource.getRepository(Message);
            const user = await UserRepo.findOneBy({ id: postedBy });

            const conversation = await ConversationRepo.findOneBy({ id: chatRoom });
            const newMessage = new Message();
            newMessage.content = content;
            newMessage.conversation = conversation;
            newMessage.postedBy = user;
            newMessage.type = messageType;
            conversation.updated_at = new Date();
            await AppDataSource.manager.save(conversation);
            await AppDataSource.manager.save(newMessage);
            return newMessage
        }catch(error){
            throw new  Error(error)
        }
    } 
}

const messageService = MessageService.getInstance()

export { messageService as MessageService}