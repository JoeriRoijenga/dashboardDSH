import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public create_user(name: string, pwd: string, mail: string, admin: boolean): Observable<boolean> {
    return this.http.post( `${environment.urlAPI}/users/create`, {name: name, pwd: pwd, mail: mail, admin: Number(admin)}).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public login(mail: string, pwd: string): Observable<boolean> {
    return this.http.post<any>(`${environment.urlAPI}/users/login`, {mail, pwd}).pipe(
      tap(response => {
        this.saveTokens(response.tokens);
      }),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public logout(): Observable<any> {
    let body = {};
    if (this.getRefreshToken() != null) {
      body = {token: this.getRefreshToken()};
    }

    return this.http.post<any>(`${environment.urlAPI}/users/logout`, body).pipe(
      tap(() => {
        this.removeTokens(false)
      },
      catchError((error) => {
        console.log(error.message);
        return error;
      })
    ));
  }

  public isLoggedIn(): boolean {
    if (this.getRefreshToken() != null) {
      return true;
    }

    return false;
  }

  public refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.urlAPI}/users/refresh`, {refresh_token: this.getRefreshToken()}).pipe(
      tap((response) => {
        this.saveAccessToken(response.access_token);
      },
      catchError((error) => {
        console.log(error.message);
        this.logout().subscribe();
        return error;
      })
    ));
  }

  public saveTokens(tokens): void {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  public saveAccessToken(token): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  public removeTokens(reload = true): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);

    if (reload) {
      this.router.navigate([this.router.url]);
    }
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public getRefreshToken(): string {
    const token = localStorage.getItem(this.REFRESH_TOKEN);
    if (token != null) {
      if (!this.tokenValid(token) || this.tokenExpired(token)) {
        this.removeTokens();
        return null;
      }
    }

    return token;
  }

  public tokenValid(token: string): boolean {
    if ((token === null && this.getRefreshToken() !== null)) {
      return false;
    } else if (token !==  null) {
      return token.split('.').length === 3;
    }

    return true;
  }

  public tokenExpired(token: string){
    if (token !== null && this.tokenValid(token)) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      const tokenExpired = Date.now() > (jwtToken.exp * 1000);

      return tokenExpired;
    }
    return true;
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/all`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/${id}`);
  }
}
