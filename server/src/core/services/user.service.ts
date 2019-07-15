// Vendors
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getCustomRepository, UpdateResult } from "typeorm";

// Interfaces
import { IUser } from "./../interfaces";
// Entities
import { Users } from "./../entities";
// Repositories
import { UserRepository } from "../repositories";

@Injectable()
export class UserService {

    private userRep = getCustomRepository(UserRepository)

    constructor (
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>,
    ) {}

    public async chagneUserAvatar(user: IUser): Promise<UpdateResult> {
        return this.userRep.chagneUserAvatar(user)
    }

}