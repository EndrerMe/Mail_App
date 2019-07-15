// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

// Services
import { MailService } from './../core/services';
// Interfaces
import { INewLetter } from './../core/interfaces';
// Entities
import { Letters } from './../core/entities';

@Controller('mail')
export class MailController {

    constructor(
        private mailService: MailService
    ) {}

    @Post('getAllIncoming')
    public async getAllIncoming(@Body() userId: {userId: number}): Promise<Letters[]> {
        return await this.mailService.getAllIncoming(userId.userId)
    }

    @Post('getAllOutcoming')
    public async getAllOutcoming(@Body() userId: {userId: number}): Promise<Letters[]> {
        return await this.mailService.getAllOutcoming(userId.userId)
    }

    @Post('sendLetter')
    public async sendLetter(@Body() letter: INewLetter): Promise<Letters> {
        return await this.mailService.sendLetter(letter)
    }

    @Post('read')
    public async read(@Body() letterId: {letterId: number}): Promise<UpdateResult> {
        return await this.mailService.read(letterId.letterId)
    }

    @Post('getColOfUnreadedLetter')
    public async getColOfUnreadedLetter(@Body() userId: {userId: number}): Promise<number> {
        return await this.mailService.getColOfUnreadedLetter(userId.userId)
    }

    @Post('deleteLetter')
    public async deleteLetter(@Body() idLetter: {idLetter: number}): Promise<DeleteResult> {
        return await this.mailService.deleteLetter(idLetter.idLetter)
    }

}
