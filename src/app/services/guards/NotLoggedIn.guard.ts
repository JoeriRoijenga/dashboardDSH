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
      this.authService.removeTokens(false);
      return this.router.parseUrl("/overview");
    }

    return !this.authService.isLoggedIn();
  }

}
