import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

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
    private jwtHelper: JwtHelperService
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
        console.log(response);

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

  public refreshToken() {
    return this.http.post<any>(`${environment.urlAPI}/users/refresh`, {});
  }

  private static getRefreshToken(): string {
    return localStorage.getItem(AuthService.REFRESH_TOKEN);
  }

  public logout() {
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
    localStorage.removeItem(AuthService.REFRESH_TOKEN);
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem(AuthService.ACCESS_TOKEN) ==  null && localStorage.getItem(AuthService.REFRESH_TOKEN) !== null) {
      this.refreshToken().subscribe(response => {
        this.saveAccessToken(response.access_token);
        return true
      });
    } else if (localStorage.getItem(AuthService.ACCESS_TOKEN) ==  null) {
      return false
    }

    return !this.tokenExpired(AuthService.ACCESS_TOKEN);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/all`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users/get/${id}`);
  }

  private tokenExpired(token){
    return this.jwtHelper.isTokenExpired(localStorage.getItem(token));
  }
}
