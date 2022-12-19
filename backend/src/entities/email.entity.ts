import { Entity, PrimaryGeneratedColumn , Column, ManyToOne } from "typeorm";
import { Faculty } from "./faculty.entity";

@Entity()
export class Email {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @ManyToOne((type) => Faculty, (faculty) => faculty.emails, {onDelete: 'CASCADE'})
    faculty: Faculty;
}