import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
      return;
    }

    this.authService.login(this.loginForm.controls.mail.value, this.loginForm.controls.password.value)
      .subscribe(
  response => {
        console.log(response);
      }
    );
    // this.authService.login(this.loginForm.controls.mail.value, this.loginForm.controls.password.value)
    //   .subscribe(
    //   response => {
    //     console.log('result:');
    //     console.log(response);
    //   },
    //   error => {
    //     console.log('error:');
    //     console.log(error.error);
    //   }
    // );

    // this.authService.getUser(33)
    //   .subscribe(
    //     response => {
    //       console.log('result:');
    //       console.log(response);
    //     },
    //     error => {
    //       console.log('error:');
    //       console.log(error.error);
    //     }
    //   );

    this.invalidLogin = true;
  }

}
