import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@entities/user.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  comment: string;

//   @Column()
//   userId : number;

  @OneToOne(() => User, user => user.feedback)
  @JoinColumn()
  user: User;

  @Column()
  @IsNumber()
  rating: number;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
