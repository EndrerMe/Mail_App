// Interface
import { IUser } from '.';

export interface ILetter {
    idLetter: number;
    letterText: string;
    recipient: IUser;
    sender: IUser;
    isRead: boolean;
    date: Date;
}
