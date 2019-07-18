// Vendors
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

// Entities
import { Users } from './';

@Entity()
export class Letters {
    @PrimaryGeneratedColumn()
    idLetter?: number;

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

    @Column({
        default: () => false,
    })
    senderDelete?: boolean;

    @Column({
        default: () => false,
    })
    recipientDelete?: boolean;

    @Column({
        default: () => false,
    })
    isRead?: boolean;

    @UpdateDateColumn()
    date?: Date;
}
