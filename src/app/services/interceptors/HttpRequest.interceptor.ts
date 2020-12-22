import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = JSON.parse(localStorage.getItem(AuthService.ACCESS_TOKEN));
    if (token) {
      console.log("Intercept");

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (localStorage.getItem(AuthService.ACCESS_TOKEN) != null && error.status === 401) {
          this.authService.refreshToken().subscribe((response) => {
            response => {
              console.log("saving...");

              this.authService.saveAccessToken(response.access_token);
            }
          },
          () => {
            this.authService.logout();
            this.router.parseUrl("/login");
          }
          );
        }

        return throwError(error)
      }
    ));
  }
}
