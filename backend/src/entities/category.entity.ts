import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  slug: string

  @OneToMany((type) => Post, (post) => post.category, {
    eager: true,
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
