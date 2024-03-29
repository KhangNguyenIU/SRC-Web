import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ROLE, ACCOUNT_STATUS } from '@enums';

import { Post } from '@entities/post.entity';
import { Faculty } from '@entities/faculty.entity';
import { Feedback } from '@entities/feedback.entity';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { ConversationParticipant } from './ConversationParticipant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    length: 128,
    unique: true,
  })
  @IsEmail({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
    default:
      'https://images.unsplash.com/photo-1668603146337-be7fcd268306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  school: string;

  @Column({
    nullable: true,
  })
  lvInterest: number;

  @Column({
    nullable: true,
  })
  mean: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.user,
    nullable: false,
  })
  role: ROLE;

  @Column({
    type: 'enum',
    enum: ACCOUNT_STATUS,
    default: ACCOUNT_STATUS.active,
  })
  enabled: ACCOUNT_STATUS;

  @OneToOne(() => Feedback, (feedback) => feedback.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  feedback: Feedback;

  @OneToMany((type) => Post, (post) => post.postedBy, {
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @ManyToOne((type) => Faculty, (faculty) => faculty.users, {
    onDelete: 'CASCADE',
  })
  faculty: Faculty;

  @OneToMany(
    (type) => ConversationParticipant,
    (conversationParticipant) => conversationParticipant.user
  )
  @JoinColumn({ name: 'userid' })
  conversationParticipants: ConversationParticipant[];

  @OneToMany((type) => Message, (message) => message.postedBy)
  messages: Message[];

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
