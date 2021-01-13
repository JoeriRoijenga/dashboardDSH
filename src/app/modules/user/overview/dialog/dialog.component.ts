import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../overview.component';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {Router} from '@angular/router';
import { Directive, Attribute  } from '@angular/core';
import { Validator,  NG_VALIDATORS } from '@angular/forms';
import validate = WebAssembly.validate;
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})



export class DialogComponent implements OnInit{
  // profileForm = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl('')
  // });
  registerForm: FormGroup;
  submitted = false;

  get fu() {return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data){ dialogRef.disableClose = false;

  }

  get error() {return this.registerForm.controls; }

  save(): void{
    this.submitted = true;

    // const name = JSON.stringify(this.registerForm.value.firstName, this.registerForm.value.lastName);
    let name = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;
    
    if (this.registerForm.invalid){
      return;
    }
    // this.dialogRef.close(this.registerForm.value);
    this.authService.create_user(name, this.registerForm.value.password, this.registerForm.value.email, false  ).subscribe();
    //alert('Simon is een legend hij fixt dit gewoon\n\n' + JSON.stringify(this.registerForm.value.email, null , 4));
  }
  close(): void{
    this.dialogRef.close();
  }


}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
