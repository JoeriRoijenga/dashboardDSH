import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log("loggedInGuard");

    if (!this.authService.isLoggedIn()) {
      return this.router.parseUrl("/login");
    }

    return this.authService.isLoggedIn();
  }

}
