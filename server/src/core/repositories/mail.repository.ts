// Vendors
import { EntityRepository, Repository, UpdateResult, DeleteResult } from 'typeorm';

// Entities
import { Letters } from './../../core/entities';

@EntityRepository(Letters)
export class MailRepository extends Repository<Letters> {

    public async getAllIncoming(userId: number): Promise<Letters[]> {
        return await this.find({
            relations: ['sender', 'recipient'],
            where: {
                recipient: {
                    idUser: userId,
                },
                recipientDelete: false,
            },
        });
    }

    public async getAllOutcoming(userId: number): Promise<Letters[]> {
        return await this.find({
            relations: ['sender', 'recipient'],
            where: {sender: {idUser: userId}},
        });
    }

    public async sendLetter(letter: Letters): Promise<Letters> {

        const newLetter = {
            letterText: letter.letterText,
            sender: letter.sender,
            recipient: letter.recipient,
        };

        return await this.save(newLetter);
    }

    public async read(letterId: number): Promise<UpdateResult> {
        return await this.update({idLetter: letterId}, {isRead: true});
    }

    public async getColOfUnreadedLetter(userId: number): Promise<number> {
        const letters = await this.find({
            relations: ['recipient'],
            where: {
                recipient: {
                    idUser: userId,
                },
                isRead: 0,
            },
        });

        return await letters.length;
    }

    public async findById(idLetter: number): Promise<Letters> {
        return await this.findOne({
            relations: ['recipient', 'sender'],
            where: { idLetter: idLetter },
        });
    }

    public async deleteLetter(letter: Letters, idUser: number): Promise<DeleteResult> {
        if (letter.recipient.idUser === idUser) {

            if (letter.senderDelete === true) {
                return await this.delete({idLetter: letter.idLetter});
            }

            return await this.update({idLetter: letter.idLetter}, {recipientDelete: true});
        }

        if (letter.sender.idUser === idUser) {

            if (letter.recipientDelete === true) {
                return await this.delete({idLetter: letter.idLetter});
            }

            return await this.update({idLetter: letter.idLetter}, {senderDelete: true});
        }

    }

}
