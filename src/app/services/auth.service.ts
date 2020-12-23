import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

class LoginResponse {
  accessToken: string;
  // refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public static readonly ACCESS_TOKEN = "access_token";
  public static readonly REFRESH_TOKEN = "refresh_token";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public create_user(name: string, pwd: string, mail: string): Observable<boolean> {
    return this.http.post( `${environment.urlAPI}/users/create`, {name: name, pwd: pwd, mail: mail}).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public login(mail: string, pwd: string): Observable<boolean> {
    return this.http.post<any>(`${environment.urlAPI}/users/login`, {mail: mail, pwd: pwd}).pipe(
      tap(response => {
        this.saveTokens(response.tokens);
      }),
      mapTo(true),
      catchError(error => {
        console.log("error!");
        console.log(error.error);
        return of(false);
      })
    );
  }

  public saveTokens(tokens): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(AuthService.REFRESH_TOKEN, tokens.refresh_token);
  }

  public saveAccessToken(token): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, token)
  }

  public refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.urlAPI}/users/refresh`, {}).pipe(
      tap((response) => {
        this.saveAccessToken(response.access_token);
    }));
  }

  private static getRefreshToken(): string {
    return localStorage.getItem(AuthService.REFRESH_TOKEN);
  }

  public logout() {
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
    localStorage.removeItem(AuthService.REFRESH_TOKEN);
  }

  public isLoggedIn(): boolean {
    return !this.tokenExpired(localStorage.getItem(AuthService.REFRESH_TOKEN));
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/all`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/${id}`);
  }

  public accessTokenValid(token: string): boolean {
    if ((token === null && localStorage.getItem(AuthService.REFRESH_TOKEN) !== null)) {
      return false;
    } else if (token !==  null) {
      return token.split(".").length === 3;
    }

    return true;
  }

  public tokenExpired(token: string){
    if (token !== null) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      const tokenExpired = Date.now() > (jwtToken.exp * 1000);

      return tokenExpired;
    }
    return true;
  }
}
