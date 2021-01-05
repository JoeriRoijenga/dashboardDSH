import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedIn: string = "";
  loggedInUrl: string = "";

  constructor(
    private authService: AuthService
  ) {
    this.loggedIn = "Logout";
    this.loggedInUrl = "/logout"
    if (!this.authService.isLoggedIn()) {
      this.loggedIn = "Login";
      this.loggedInUrl = "/login"
    }
  }

  ngOnInit(): void { }
}
