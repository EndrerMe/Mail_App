// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Enviroments
import { environment } from 'src/environments/environment.prod';
// Interfaces
import { ILetter, INewLetter } from '../interfaces';

@Injectable({
    providedIn: 'root'
  })
export class MailService {
    constructor(
        private http: HttpClient,
    ) {}


    public getAllIncoming(userId: number): Observable<ILetter[]> {
        return this.http.post<ILetter[]>(`${environment.mySql.databaseURL}/mail/getAllIncoming`, {userId})
    }

    public getAllOutcoming(userId: number): Observable<ILetter[]> {
        return this.http.post<ILetter[]>(`${environment.mySql.databaseURL}/mail/getAllOutcoming`, {userId})
    }

    public sendLetter(letter: INewLetter): Observable<INewLetter> {
        return this.http.post<INewLetter>(`${environment.mySql.databaseURL}/mail/sendLetter`, letter)
    }

    public readLetter(letterId: number): Observable<boolean> {
        return this.http.post<boolean>(`${environment.mySql.databaseURL}/mail/read`, {letterId})
    }

    public getColOfUnreadedLetter(userId: number): Observable<number> {
        return this.http.post<number>(`${environment.mySql.databaseURL}/mail/getColOfUnreadedLetter`, {userId})
    }

    public deleteLetter(idLetter: number): Observable<boolean> {
        return this.http.post<boolean>(`${environment.mySql.databaseURL}/mail/deleteLetter`, {idLetter})
    }

}
