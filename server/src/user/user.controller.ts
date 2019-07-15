// Vendors
import { Controller, Post, Body } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

// Interfaces
import { IUser } from './../core/interfaces';
// Services
import { UserService } from './../core/services';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Post('chagneUserAvatar')
    public async chagneUserAvatar(@Body() user: IUser): Promise<UpdateResult> {
        return await this.userService.chagneUserAvatar(user)
    }

}
