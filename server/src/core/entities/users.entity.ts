// Vendors
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Entities
import { Letters } from './letters.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    userName: string;

    @Column()
    userPassword: string;

    @Column({length: 20000})
    userAvatar: string;

    @OneToMany(
        type => Letters,
        letter => letter.sender,
        )
    sent: Letters[]

    @OneToMany(
        type => Letters,
        letter => letter.recipient,
        )
    received: Letters[]
}