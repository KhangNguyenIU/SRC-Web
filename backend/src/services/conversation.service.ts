import { AppDataSource } from '@config/database.config';
import { Conversation } from '@entities/conversation.entity';
import { ConversationParticipant } from '@entities/ConversationParticipant.entity';
import { QueryBuilder } from 'typeorm';

class ConversationService {
  private static instance: ConversationService;

  private constructor() {}

  static get(): ConversationService {
    if (!ConversationService.instance) {
      ConversationService.instance = new ConversationService();
    }
    return ConversationService.instance;
  }

  async getConversationByParticipants(userIds: number[]): Promise<any> {
    try {
      const ConversationRepo = await AppDataSource.getRepository(Conversation);
      const query = await ConversationRepo.createQueryBuilder('conversation')
        .select(['conversation'])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .andWhere('user.id in (:...userids)', { userids: userIds })
        .groupBy('conversation.id')
        .having('count(user.id) = 2')
        .getRawMany();

      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getConversationsByUserId(userId: number): Promise<any> {
    try {
      const ConversationRepo = await AppDataSource.getRepository(Conversation);
      const query = await ConversationRepo.createQueryBuilder('conversation')
        .select(['conversation'])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .andWhere('user.id in (:...userids)', { userids: [userId] })
        .groupBy('conversation.id')
        .getMany();

    const conversationIds = query.map((conversation) => conversation.id);
        
    // get conversation from conversationIds
    const conversations = await ConversationRepo.createQueryBuilder('conversation')
        .select(['conversation','cp','user.id','user.firstName','user.lastName','user.email','user.avatar', 'user.username'])
        .leftJoin(
            'conversation.conversationParticipants',
            'cp',
            'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .andWhere('conversation.id in (:...conversationIds)', { conversationIds })
        .orderBy('conversation.updated_at', 'DESC')
        .leftJoinAndSelect('conversation.messages', 'message')
        .leftJoin('message.postedBy', 'postedBy')
        .addSelect(['postedBy.id','postedBy.firstName','postedBy.lastName','postedBy.email','postedBy.avatar', 'postedBy.username'])
        .addOrderBy('message.created_at', 'DESC')
        .getMany();
        return conversations
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getConversationById(conversationId: number): Promise<any> {
    try {
      const ConversationRepo = await AppDataSource.getRepository(Conversation);
      const query = await ConversationRepo.createQueryBuilder('conversation')
        .select(['conversation'])
        .leftJoin(
          'conversation.conversationParticipants',
          'cp',
          'conversation.id = cp.conversationId'
        )
        .leftJoin('cp.user', 'user', 'user.id = cp.userId')
        .leftJoinAndSelect('conversation.messages', 'message')
        .addOrderBy('message.created_at', 'ASC')
        .andWhere('conversation.id = :conversationId', { conversationId })
        .getOne();

      return query;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const conversationService = ConversationService.get();

export { conversationService as ConversationService };
