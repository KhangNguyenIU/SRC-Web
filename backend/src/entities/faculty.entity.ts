import { Entity, PrimaryGeneratedColumn , Column, OneToMany} from "typeorm";
import  {Email} from '@entities/email.entity';
import { Phone } from "./phone.entity";
import {User} from '@entities/user.entity'
@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;
    
    @Column({
        nullable: false,
        unique: true
    })
    slug : string;

    @OneToMany((type) =>  Email, (email) => email.faculty , {cascade: true, eager: true})
    emails: Email[];

    @OneToMany((type) =>  Phone, (phone) => phone.faculty,{cascade: true, eager: true})
    phones: Phone[];

    @OneToMany((type) =>  User, (user) => user.faculty,{cascade: true})
    users: User[];
}