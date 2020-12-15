import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

class LoginResponse {
  accessToken: string;
  // refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public static readonly ACCESS_TOKEN = "access_token";

  constructor(
    private http: HttpClient
  ) { }

  public create_user(name: string, pwd: string, mail: string): Observable<any> {
    return this.http.post(environment.urlAPI + '/users/create', {name: name, pwd: pwd, mail: mail});
  }

  public login(mail: string, pwd: string) {
    return this.http.post<any>(environment.urlAPI + '/users/login', {mail: mail, pwd: pwd}).pipe(tap(response => {
      localStorage.setItem('access_token', response.accessToken)
    }));
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !==  null;
  }

  public getUsers(): Observable<any> {
    return this.http.get(environment.urlAPI + '/users/get/all');
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(environment.urlAPI + `/users/get/${id}`);
  }
}
