import { Entity, PrimaryGeneratedColumn , Column, ManyToOne} from "typeorm";
import { Faculty } from "./faculty.entity";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    phone: string;

    @ManyToOne((type) => Faculty, (faculty) => faculty.phones, {onDelete: 'CASCADE'})
    faculty: Faculty;
}