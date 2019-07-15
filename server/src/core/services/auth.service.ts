// Vendors
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { getCustomRepository, getRepository, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Interfaces
import { IUser } from "../interfaces";
// Entities
import { Users } from "../entities";
// Repositories
import { AuthRepository } from "../repositories/";
// Strategy
import { JwtPayload } from "./../../strategy/interfaces/jwt.model";

@Injectable()
export class AuthService {

    private authRep = getCustomRepository(AuthRepository)

    constructor(
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>,
        private readonly jwtService: JwtService,
    ) {}

    public async registration(user: IUser): Promise<IUser> {
        const newUser = this.authRep.create();
        // image in base64
        user.userAvatar = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjMxMS41NDFweCIgaGVpZ2h0PSIzMTEuNTQxcHgiIHZpZXdCb3g9IjAgMCAzMTEuNTQxIDMxMS41NDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxMS41NDEgMzExLjU0MTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNTUuNzcxLDI2LjMzMUM2OS43NCwyNi4zMzEsMCw5Ni4wNzEsMCwxODIuMTAyYzAsMzcuNDg4LDEzLjI1LDcxLjg4MywzNS4zMTQsOTguNzYxDQoJCQljMy40MDQtMjcuMjU2LDMwLjYyNy01MC4zMDgsNjguOC02MS4yMjVjMTMuOTQ2LDEyLjk5NCwzMS45NiwyMC44NzgsNTEuNjU2LDIwLjg3OGMxOS4yMzMsMCwzNi44OTQtNy40ODcsNTAuNjk4LTE5LjkzNg0KCQkJYzM4LjUwMywxMS44NzEsNjUuMTQxLDM2LjI3LDY2LjAxNyw2NC42M2MyNC4yODQtMjcuNDcyLDM5LjA1Ni02My41NTUsMzkuMDU2LTEwMy4xMDgNCgkJCUMzMTEuNTQxLDk2LjA3MSwyNDEuODAxLDI2LjMzMSwxNTUuNzcxLDI2LjMzMXogTTE1NS43NzEsMjIyLjA2OWMtOS45NDQsMC0xOS4zMTQtMi43MzItMjcuNjM0LTcuNDY0DQoJCQljLTIwLjA1LTExLjQwOS0zMy44NTUtMzQuNzU2LTMzLjg1NS02MS43MTFjMC0zOC4xNDMsMjcuNTgzLTY5LjE3Niw2MS40ODktNjkuMTc2YzMzLjkwOSwwLDYxLjQ4OSwzMS4wMzMsNjEuNDg5LDY5LjE3Ng0KCQkJYzAsMjcuMzY5LTE0LjIzNyw1MS4wMDQtMzQuNzg2LDYyLjIxNUMxNzQuMzc5LDIxOS41MjMsMTY1LjM0NiwyMjIuMDY5LDE1NS43NzEsMjIyLjA2OXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
        await this.authRep.registration(user);
        return;
    }

    public async login(user: IUser): Promise<{ token: string }> {
        let isUser: Users;
        await this.authRep.findByName(user.userName).then((res) => {
            isUser = res
        })
        const match = await bcrypt.compare (user.userPassword, isUser.userPassword);

        if (isUser === undefined) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }

        if (!match) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password is worng',
            }, 403);
        }

        if (isUser && match) {
            const userPayload: JwtPayload = {
                idUser: isUser.idUser,
                userName: isUser.userName,
                userAvatar: isUser.userAvatar
            }
            const token = await this.jwtService.sign(userPayload);

            return { token };
        }
    }
}
