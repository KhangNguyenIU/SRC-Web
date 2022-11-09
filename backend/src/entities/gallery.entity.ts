import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  theme: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
