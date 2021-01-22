import { Component, OnInit, Inject, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../overview.component';
import {FormBuilder, FormGroup, FormControl, Validators,ReactiveFormsModule, Form} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {Router} from '@angular/router';
import { Directive, Attribute  } from '@angular/core';
import { Validator,  NG_VALIDATORS } from '@angular/forms';
import validate = WebAssembly.validate;
import { AuthService } from '../../../../services/auth.service';
import {passBoolean} from "protractor/built/util";

interface AdminSelect{
  value: boolean,
  viewValue: string,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})


export class EditDialogComponent implements OnInit{

  public registerForm: FormGroup;
  public submitted = false;
  public selected: boolean;
  public ID: number;
  get fu() {return this.registerForm.controls; }

  adminrights: AdminSelect[]= [
    {value: true, viewValue: 'admin rights'},
    {value: false, viewValue: 'no admin rights'}
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data){ dialogRef.disableClose = false;
  //@Inject(MAT_DIALOG_DATA) data: Userdata{any}){ dialogRef.disableClose = false;
  }

  // changeRights(e){
  //   this.adminrights.setValue(e.target.value,{onlySelf: true})
  // }

  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    console.log("registerform:")
    console.log(this.registerForm);
  }



  get error() {return this.registerForm.controls; }

  save(): void{
    this.submitted = true;

    let name = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;

    console.log(this.selected);
    if (this.registerForm.invalid){
      return;
    }

    this.authService.updateUser( this.ID ,name , this.registerForm.value.email, Boolean(this.selected)).subscribe();
    this.dialogRef.close();
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
