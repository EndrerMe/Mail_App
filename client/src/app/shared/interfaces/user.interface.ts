export interface IUser {
    idUser: number;
    userName: string;
    userPassword: string;
    userAvatar: string;
    token?: string;
    iat?: number;
    exp?: number;
}
