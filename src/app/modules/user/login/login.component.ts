import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { log } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.invalidLogin = false;
  }

  loginForm = this.formBuilder.group({
    mail: ['', Validators.compose([Validators.required])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.invalidLogin = true;
    }

    this.authService.login(this.loginForm.controls.mail.value, this.loginForm.controls.password.value).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/overview']);
        }
        this.invalidLogin = true;
      }
    );
  }

}
