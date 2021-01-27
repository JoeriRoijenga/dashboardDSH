import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.invalidLogin = true;
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

    // this.authService.create_user("test", "test2", "test@test.com", 1).subscribe();

    this.authService.login(String(this.loginForm.controls.mail.value).toLowerCase(), this.loginForm.controls.password.value).subscribe(
      response => {
        if (response) {
          this.router.navigate(['/admin']);
        }
        
        this.invalidLogin = false;
      }
    );
  }
}
