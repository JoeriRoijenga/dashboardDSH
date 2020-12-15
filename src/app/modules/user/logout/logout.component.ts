import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    authService.logout();
    this.router.navigateByUrl("/login").then(); // Promise ignored
  }

  ngOnInit(): void {
  }



}
