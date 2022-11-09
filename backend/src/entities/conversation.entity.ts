import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column((type) => User)
  staffUser: User;

  @Column((type) => User)
  customerUser: User;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
