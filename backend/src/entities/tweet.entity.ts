import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,OneToMany
} from 'typeorm';
import { Gallery } from './gallery.entity';
import  { Image } from './image.entity';
@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @Column((type) => Gallery)
  gallery: Gallery;

  @OneToMany( type => Image, image =>image.tweet)
    images: Image[];

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
