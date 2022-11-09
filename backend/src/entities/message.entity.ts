import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column((type) => Conversation)
  conversation: Conversation;

  @Column((type) => User)
  postedBy: User;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
