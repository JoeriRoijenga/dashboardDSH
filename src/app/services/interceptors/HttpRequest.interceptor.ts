import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  errorlist = [401, 422];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var tokenType = null;
    if (request.url === (`${environment.urlAPI}/users/refresh`)) {
      tokenType = AuthService.REFRESH_TOKEN;
    } else {
      tokenType = AuthService.ACCESS_TOKEN;
    }

    const token = localStorage.getItem(tokenType);

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (localStorage.getItem(AuthService.REFRESH_TOKEN) != null && this.errorlist.find(code => code == error.status)) {
          return this.handleError(request, next);
        }

        return throwError(error)
      }
    ));
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response) => {
        console.log(request);
        return next.handle(this.addToken(request, response.access_token));
    }));
  }

  private addToken(request: HttpRequest<any>, token: string,) {
    console.log("handle new request");

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
