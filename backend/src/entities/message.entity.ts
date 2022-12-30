import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MESSAGE_TYPE } from '@enums';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: MESSAGE_TYPE,
  })
  type: MESSAGE_TYPE;

  @ManyToOne((type) => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @ManyToOne((type) => User, (user) => user.messages)
  postedBy: User;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
