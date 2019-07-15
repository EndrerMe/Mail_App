import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
// Vendors

// Controllers
// Services
// Modules


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    MailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor (
    private readonly connection: Connection,
    ) {}
}
