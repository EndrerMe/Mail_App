// Vendors
import { EntityRepository, Repository, UpdateResult } from 'typeorm';

// Entities
import { Users } from '../entities';
// Interfaces
import { IUser } from './../interfaces';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {

    public chagneUserAvatar(user: IUser): Promise<UpdateResult> {
        return this.update({idUser: user.idUser}, user);
    }

}
