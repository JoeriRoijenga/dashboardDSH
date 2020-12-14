import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      console.log("(NotLoggedInGuard) logged in");
      return this.router.parseUrl("/overview")
    }

    console.log("(NotLoggedInGuard) not logged in");
    return true;
  }

}
