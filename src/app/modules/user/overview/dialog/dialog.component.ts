import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

interface AdminSelect{
  value: number,
  viewValue: string,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  public registerForm: FormGroup;
  public submitted = false;
  public selected: number;
  get fu() {return this.registerForm.controls; }

  adminrights: AdminSelect[]= [
    {value: 1, viewValue: 'Admin'},
    {value: 0, viewValue: 'Normal'}
  ];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get error() {return this.registerForm.controls; }

  save(): void{
    this.submitted = true;
    
    if (this.registerForm.invalid){
      return;
    }
    
    this.authService.create_user(this.registerForm.value.name, this.registerForm.value.password, String(this.registerForm.value.email).toLowerCase(), this.selected).subscribe();
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
