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

  private errorlist = [401, 422];
  private refresh = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = request.url === (`${environment.urlAPI}/users/refresh`) ? this.authService.getRefreshToken() : this.authService.getAccessToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (this.authService.getRefreshToken() != null && this.errorlist.find(code => code == error.status) && !this.refresh) {
          this.refresh = true;
          return this.handleError(request, next);
        }
        this.refresh = false;
        this.authService.removeTokens();
      }
    ));
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response) => {
        return next.handle(this.addToken(request, response.access_token));
     })
    );
  }

  private addToken(request: HttpRequest<any>, token: string,) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
