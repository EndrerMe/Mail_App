// Interfaces
import { IUser } from "./IUser.interface";

export interface INewLetter {
    sender: number;
    recipient: string[];
    letterText: string;
}