// Vendors
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';

// Entities
import { Users } from './';

@Entity()
export class Letters {
    @PrimaryGeneratedColumn()
    idLetter: number;

    @ManyToOne(
        type => Users,
        user => user.sent,
        )
    @JoinColumn({ name: 'sender' })
    sender: Users;

    @ManyToOne(
        type => Users,
        user => user.received,
        )
    @JoinColumn({ name: 'recipient' })
    recipient: Users;

    @Column({length: 5000})
    letterText: string;

    @Column()
    isRead: boolean
}