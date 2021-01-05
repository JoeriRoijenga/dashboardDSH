import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    authService.logout().subscribe(() => {
      router.navigate(['/login']);
    });

  }

  ngOnInit(): void {
  }



}
