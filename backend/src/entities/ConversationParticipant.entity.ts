import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "./user.entity";


@Entity()
export class ConversationParticipant {
    @PrimaryColumn()
    conversationid: number;

    @PrimaryColumn()
    userid : number;

    @ManyToOne(type => Conversation, conversation => conversation.conversationParticipants, {onDelete:'CASCADE'})
    @JoinColumn({name: 'conversationid'})
    conversation: Conversation;

    @ManyToOne(type=> User, user => user.conversationParticipants, {onDelete:'CASCADE'})
    @JoinColumn({name: 'userid'})
    user: User;
}