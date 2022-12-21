import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "./user.entity";


@Entity()
export class ConversationParticipant {
    @PrimaryColumn()
    conversationId: number;

    @PrimaryColumn()
    userId : number;

    @ManyToOne(type => Conversation, conversation => conversation.conversationParticipants, {onDelete:'CASCADE'})
    @JoinColumn({name: 'conversationId'})
    conversation: Conversation;

    @ManyToOne(type=> User, user => user.conversationParticipants, {onDelete:'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: User;
}