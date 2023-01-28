import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Conversation } from '@entities/conversation.entity';
import { ConversationParticipant } from '@entities/ConversationParticipant.entity';
import { User } from '@entities/user.entity';
import { ConversationService } from '@services/conversation.service';
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
      console.log('user1', user1)
        console.log('user2', user2)

      // check if conversation existed
      const existedConversation =
        await ConversationService.getConversationByParticipants([
          chatInitiatorId,
          chatReceiverId,
        ]);
      if (existedConversation.length > 0) {
        return res.status(400).json({ message: 'Conversation existed' });
      }

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
        .select(['conversation', 'cp', 'user', 'message'])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .leftJoin('conversation.messages', 'message')
        .addSelect('message')
        .getMany();

      return res
        .status(200)
        .json({ message: 'Get conversation success', conversation });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when get conversation');
    }
  }


  // get list conversation belong to a user
  async getConversationByUserId(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.user;

      const ConversationRepo = await AppDataSource.getRepository(Conversation);
      const conversations = await ConversationService.getConversationsByUserId(
        id
      );

      return res
        .status(200)
        .json({ message: 'Get conversation success', conversations });
    } catch (error) {
      Logger.log('error', error);
      console.log(error)
      return res.status(400).send('Error occurs when get conversation');
    }
  }

    // get conversation by participants
  async getConversationByParticipants(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.user;
      const { chatReceiverId } = req.body as unknown as {
        chatReceiverId: number;
      };

      const conversations =
        await ConversationService.getConversationByParticipants([
          id,
          chatReceiverId,
        ]);
      return res
        .status(200)
        .json({ message: 'Get conversation success', conversations });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when get conversation');
    }
  }

  // get messages of a conversation
    async getMessagesByConversationId(
      req: Request,
      res: Response
    ): Promise<Response<string | any>> {
      try {
        const { id } = req.params as unknown as { id: number };
        const ConversationRepo = await AppDataSource.getRepository(Conversation);
        const conversation = await ConversationService.getConversationById(id);
        return res
          .status(200)
          .json({ message: 'Get conversation success', conversation });
      } catch (error) {
        Logger.log('error', error);
        return res.status(400).send('Error occurs when get conversation');
      }
    }
}

const conversationController = ConversationController.get();

export { conversationController as ConversationController };
