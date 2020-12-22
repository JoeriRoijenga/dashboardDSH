import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log("notLoggedIn");

    if (this.authService.isLoggedIn()) {
      return this.router.parseUrl("/overview")
    }

    return !this.authService.isLoggedIn();
  }

}
