// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getCustomRepository, UpdateResult } from 'typeorm';

// Entities
import { Letters, Users } from '../entities';
// Repositories
import { MailRepository, AuthRepository } from '../repositories';
// Interfaces
import { INewLetter } from '../interfaces';

@Injectable()
export class MailService {
    private mailRep = getCustomRepository(MailRepository);
    private userRep = getCustomRepository(AuthRepository)

    constructor (
        @InjectRepository(Letters)
        private readonly mailRepository: Repository<Letters>,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    public async getAllIncoming(userId: number): Promise<Letters[]> {
        return await this.mailRep.getAllIncoming(userId)
    }

    public async getAllOutcoming(userId: number): Promise<Letters[]> {
        return await this.mailRep.getAllOutcoming(userId)
    }

    public async sendLetter(letter: INewLetter): Promise<Letters> {
        let recipient: Users[] = [];
        let sender: Users;
        let letterValue: {
            letterText: string,
            sender: Users,
            recipient: Users[],
            isRead: boolean,
        };

        for (let i = 0; i < letter.recipient.length; i++) {
            await this.userRep.findByName(letter.recipient[i]).then((res) => {
                recipient.push(res);
            }, (err) => {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `${letter.recipient[i]} not found`,
                }, 400);
            })
        }

        await this.userRep.findById(letter.sender).then((res) => {
            sender = res;
        })

        if (recipient.length === 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Recipient not found',
            }, 400);
        }

        if (!sender) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Sender not found',
            }, 400);
        }

        for (let i = 0; i < letter.recipient.length; i++) {
            if (sender.idUser === recipient[i].idUser) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'You can not send letters to themselves',
                }, 403);
            }
        }

        letterValue = {
            letterText: letter.letterText,
            sender: sender,
            recipient: recipient,
            isRead: false
        }

        return await this.mailRep.sendLetter(letterValue)
    }

    public async read(letterId: number): Promise<UpdateResult> {
        return await this.mailRep.read(letterId)
    }

    public async getColOfUnreadedLetter(userId: number): Promise<number> {
        return await this.mailRep.getColOfUnreadedLetter(userId);
    }
}
