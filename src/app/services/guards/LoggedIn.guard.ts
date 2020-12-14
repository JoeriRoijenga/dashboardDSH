import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      console.log("(LoggedInGuard) logged in");
      return this.router.parseUrl("/login");
    }
    console.log("(LoggedInGuard) not logged in");
    return true;
  }

}
