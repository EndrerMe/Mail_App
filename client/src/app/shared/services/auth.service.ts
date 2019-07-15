// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { IUser } from 'src/app/shared/interfaces/';
// Enviroments
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public registration(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.mySql.databaseURL}/auth/registration`, user);
  }

  public login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.mySql.databaseURL}/auth/login`, user);
  }

  public chagneUserAvatar(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.mySql.databaseURL}/user/chagneUserAvatar`, user)
  }
}
