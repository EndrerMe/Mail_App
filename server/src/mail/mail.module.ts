// Vendors
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { MailController } from './mail.controller';
// Services
import { MailService } from './../core/services';
// Entities
import { Letters, Users } from './../core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Letters, Users]),
  ],
  controllers: [
    MailController,
  ],
  providers: [
    MailService,
  ],
})
export class MailModule {}
