import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

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

  adminrights: AdminSelect[] = [
    {value: true, viewValue: 'admin rights'},
    {value: false, viewValue: 'no admin rights'}
  ];

  public name: string;
  public mail: string;
  public admin: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    dialogRef.disableClose = false;
    //@Inject(MAT_DIALOG_DATA) data: Userdata{any}){ dialogRef.disableClose = false;
  }

  // changeRights(e){
  //   this.adminrights.setValue(e.target.value,{onlySelf: true})
  // }

  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      // firstName: ['', Validators.required],
      name: ['', Validators.required],
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

    // let name = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;

    console.log(this.selected);
    if (this.registerForm.invalid){
      return;
    }

    this.authService.updateUser( this.ID ,  this.registerForm.value.name, this.registerForm.value.email, Boolean(this.selected)).subscribe();
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
