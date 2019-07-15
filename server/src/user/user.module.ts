// Vendors
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UserController } from './user.controller';
// Entities
import { Users } from './../core/entities';
// Services
import { UserService } from './../core/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [
    UserService
  ],
  controllers: [UserController]
})
export class UserModule {}
