import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

interface AdminSelect{
  value: number,
  viewValue: string,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit{
  public editForm: FormGroup;
  public submitted = false;
  public user: {};

  get fu() {return this.editForm.controls; }

  adminrights: AdminSelect[] = [
    {value: 1, viewValue: 'Admin'},
    {value: 0, viewValue: 'User'}
  ];

  private id: number;
  public name: string;
  public mail: string;
  public admin: number;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    dialogRef.disableClose = false;
    this.id = data.id;

    this.authService.getUser(this.id).subscribe(response => {      
      this.name = response.user[0].name;
      this.mail = response.user[0].mail;
      this.admin = Boolean(response.user[0].admin) == true ? this.adminrights[0].value : this.adminrights[1].value;
    });
  }

  ngOnInit(): void {
    this.editForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: ['', Validators.required],
    });
  }

  get error() {return this.editForm.controls; }

  save(): void{    
    this.submitted = true;

    if (this.editForm.invalid){
      return;
    }

    this.authService.updateUser(this.id, this.editForm.value.name, this.editForm.value.email, this.admin).subscribe();
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
