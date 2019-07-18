// Vendors
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Entities
import { Users } from './../entities';
// Interfaces
import { IUser } from './../interfaces';
// JWT Strategy

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {

    public async findByName(userName: string): Promise<Users> {
        return await this.findOne({
            where: {
                userName: userName,
            },
        });
    }

    public async findById(idUser: number): Promise<Users> {
        return await this.findOne({
            where: {
                idUser: idUser,
            },
        });
    }

    public async registration(user: IUser): Promise<Users> {
        const saltRounds: number = 10;
        let isUser: Users;
        await this.findByName(user.userName).then((res) => {
            isUser = res;
        });

        if (isUser !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This username is already in use',
            }, 403);
        } else {
            const newUser = await bcrypt.hash(user.userPassword, saltRounds, async (err, hash) => {
                user.userPassword = hash;
                await this.save(user);
            });

            return await newUser;
        }
    }
}
