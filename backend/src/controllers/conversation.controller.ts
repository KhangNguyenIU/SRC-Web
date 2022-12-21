import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Conversation } from '@entities/conversation.entity';
import { ConversationParticipant } from '@entities/ConversationParticipant.entity';
import { User } from '@entities/user.entity';
import { Request, Response } from 'express';
import { Any } from 'typeorm';

class ConversationController {
  private static instance: ConversationController;

  private constructor() {}

  static get(): ConversationController {
    if (!ConversationController.instance) {
      ConversationController.instance = new ConversationController();
    }
    return ConversationController.instance;
  }

  async createConversation(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const chatInitiatorId = req.user.id;
      let { chatReceiverId } = req.body as unknown as {
        chatReceiverId: number;
      };
      chatReceiverId = Number(chatReceiverId);

      // existed user
      const user1 = await AppDataSource.getRepository(User).findOneBy({
        id: chatInitiatorId,
      });
      const user2 = await AppDataSource.getRepository(User).findOneBy({
        id: chatReceiverId,
      });

      const newConversation = new Conversation();
      await AppDataSource.manager.save(newConversation);

      // middle table
      const ConversationParticipantRepo = await AppDataSource.getRepository(
        ConversationParticipant
      );
      Array.from(Array(2)).forEach(async (_, index) => {
        const conversationParticipant = new ConversationParticipant();
        conversationParticipant.conversation = newConversation;
        conversationParticipant.user = index === 0 ? user1 : user2;
        await ConversationParticipantRepo.save(conversationParticipant);
      });

      return res
        .status(200)
        .json({ message: 'Create new conversation success', newConversation });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when create conversation');
    }
  }

  async getConversation(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.params;
      const ConversationRepo = await AppDataSource.getRepository(Conversation);
      const conversation = await ConversationRepo.createQueryBuilder(
        'conversation'
      )
      .select([
        'conversation',
        'cp',
        'user.id',
        'user.username',
        'user.email',
      ])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .getMany();

      return res
        .status(200)
        .json({ message: 'Get conversation success', conversation });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when get conversation');
    }
  }

  async getConversationByUserId(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
    //   const { id } = req.user;
        const id = 2;
      const ConversationRepo = await AppDataSource.getRepository(Conversation);

      const conversations = await ConversationRepo.createQueryBuilder(
        'conversation'
      )
      .select([
        'conversation',
        'cp',
        'user.id',
        'user.username',
        'user.email',
        'message'
      ])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .where('user.id = :id', { id })
        .leftJoin('conversation.messages', 'message', 'message.conversationId = conversation.id')
        .getMany();
      return res
        .status(200)
        .json({ message: 'Get conversation success', conversations });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when get conversation');
    }
  }
}

const conversationController = ConversationController.get();

export { conversationController as ConversationController };
