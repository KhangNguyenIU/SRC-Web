import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { User } from '@entities/user.entity';
import { Category } from './category.entity';
import slugify from 'slugify';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column()
  slug: string;

  @Column({
    nullable: false,
  })
  body: string;

  @Column({
    nullable: true,
  })
  keywords: string;

  @Column()
  year: number;

  @ManyToOne((type) => User, (user) => user.posts, {onDelete: 'CASCADE'})
  postedBy: User;

  @ManyToOne((type) => Category, (category) => category.posts)
  category: Category;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;


}
