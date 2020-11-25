import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.invalidLogin = false;
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {

  }

  onSubmit(): void {
    // console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    const data = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };

    console.log(data);

    this.invalidLogin = true;
  }

}
