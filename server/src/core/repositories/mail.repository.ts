// Vendors
import { EntityRepository, Repository, Not, Connection, UpdateResult, DeleteResult } from "typeorm";

// Entities
import { Letters, Users } from "./../../core/entities";
// Interfaces
import { INewLetter } from "../interfaces";

@EntityRepository(Letters)
export class MailRepository extends Repository<Letters> {

    public async getAllIncoming(userId: number): Promise<Letters[]> {
        return await this.find({
            relations: ['sender', 'recipient'],
            where: {
                recipient: {
                    idUser: userId
                }
            }
        });
    }

    public async getAllOutcoming(userId: number): Promise<Letters[]> {
        return await this.find({
            relations: ['sender', 'recipient'],
            where: {sender: {idUser: userId}},
        });
    }

    public async sendLetter(letter: {
        letterText: string,
        sender: Users,
        recipient: Users[],
        isRead: boolean
    }): Promise<Letters> {

        for (let i = 0; i < letter.recipient.length; i++) {
            let newLetter = {
                letterText: letter.letterText,
                sender: letter.sender,
                recipient: letter.recipient[i],
                isRead: letter.isRead
            }

            await this.save(newLetter)
        }

        return 
    }

    public async read(letterId: number): Promise<UpdateResult> {
        return await this.update({idLetter: letterId}, {isRead: true})
    }

    public async getColOfUnreadedLetter(userId: number): Promise<number> {
        const letters = await this.find({
            relations: ['recipient'],
            where: {
                recipient: {
                    idUser: userId
                },
                isRead: 0
            }
        })

        return await letters.length;
    }

    public async findById(idLetter: number): Promise<Letters> {
        return await this.findOne({
            where: {idLetter: idLetter}
        })
    }

    public async deleteLetter(idLetter: number): Promise<DeleteResult> {
        return await this.delete({idLetter: idLetter})
    }

}
