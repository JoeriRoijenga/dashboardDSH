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

  private readonly ACCESS_TOKEN = "access_token";
  private readonly REFRESH_TOKEN = "refresh_token";

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
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  public saveAccessToken(token): void {
    localStorage.setItem(this.ACCESS_TOKEN, token)
  }

  public removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.urlAPI}/users/refresh`, {"refresh_token": this.getRefreshToken()}).pipe(
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

  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public logout(): Observable<any> {
    var body = {}
    if (this.tokenValid(this.getRefreshToken())) {
      body = {"token": this.getRefreshToken()}
    }

    return this.http.post<any>(`${environment.urlAPI}/users/logout`, body).pipe(
      tap(() => {
        this.removeTokens()
        this.router.navigateByUrl("/login").then(); // Promise ignored
      },
      catchError((error) => {
        console.log(error.message);
        return error;
      })
    ));
  }

  public isLoggedIn(): boolean {
    if (!this.tokenExpired(this.getRefreshToken())) {
      return true;
    }

    if (this.getRefreshToken === null) {
      this.logout().subscribe();
    }
    return false;
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/all`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/${id}`);
  }

  public tokenValid(token: string): boolean {
    if ((token === null && this.getRefreshToken() !== null)) {
      return false;
    } else if (token !==  null) {
      return token.split(".").length === 3;
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
}
