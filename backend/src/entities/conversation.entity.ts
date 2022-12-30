import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';
import { ConversationParticipant } from './ConversationParticipant.entity';
@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => ConversationParticipant,
    (conversationParticipant) => conversationParticipant.conversation
  )
  @JoinColumn({ name: 'conversationid' })
  conversationParticipants: ConversationParticipant[];

  @OneToMany((type) => Message, (message) => message.conversation, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  messages: Message[];

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
