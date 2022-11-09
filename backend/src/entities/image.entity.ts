import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";

import { Tweet } from "./tweet.entity";
@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => Tweet, tweet => tweet.images)
    tweet:Tweet;

    @CreateDateColumn()
    created_at;

    @UpdateDateColumn()
    updated_at;
}