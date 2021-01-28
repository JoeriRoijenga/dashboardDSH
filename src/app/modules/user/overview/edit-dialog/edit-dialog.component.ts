import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

interface AdminSelect{
  value: number,
  viewValue: string,
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit{
  public editForm: FormGroup;
  public submitted = false;
  public user: {};
  public selfEdit = false;

  get fu() {return this.editForm.controls; }

  adminrights: AdminSelect[] = [
    {value: 1, viewValue: 'Admin'},
    {value: 0, viewValue: 'User'}
  ];

  private id: number;
  public name: string;
  public mail: string;
  public admin: number;
  
  public rights: boolean;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    dialogRef.disableClose = false;
    this.id = data.id;
    this.rights = this.authService.getRightsFromToken();

    if (this.id === Number(this.authService.getIdFromToken())) {
      this.selfEdit = true;
    }

    this.authService.getUser(this.id).subscribe(response => {      
      this.name = response.user[0].name;
      this.mail = response.user[0].mail;
      this.admin = Boolean(response.user[0].admin) == true ? this.adminrights[0].value : this.adminrights[1].value;
    });
  }

  ngOnInit(): void {
    if (this.selfEdit) {
      this.editForm = this.formbuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.minLength(4)]],
        confirmPassword: ['', [Validators.minLength(4)]]
      });

      if (this.rights) {
        this.editForm.addControl('admin', new FormControl('', Validators.required));
      }
    } else {
      this.editForm = this.formbuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        admin: ['', Validators.required],
      });
    }
  }

  get error() {
    return this.editForm.controls; 
  }

  save(): void{    
    this.submitted = true;

    if (this.editForm.invalid){
      return;
    }

    if (this.selfEdit) {
      this.authService.login(String(this.editForm.value.email).toLowerCase(), this.editForm.value.currentPassword).subscribe(response => {        
        if (response) {
          if (this.editForm.value.newPassword == "") {
            this.authService.updateUser(this.id, this.editForm.value.name, String(this.editForm.value.email).toLowerCase(), this.admin).subscribe(() => {
              this.close();
            });
          } else {
            if (this.editForm.value.newPassword == this.editForm.value.confirmPassword) {
              this.authService.updateSelf(this.id, this.editForm.value.name, String(this.editForm.value.email).toLowerCase(), this.admin, this.editForm.value.newPassword).subscribe(() => {
                this.close();
              });
            } else {
              this.editForm.controls["confirmPassword"].setErrors({ mustMatch: true });
            }
          }
        }
      })
    } else {
      this.authService.updateUser(this.id, this.editForm.value.name, String(this.editForm.value.email).toLowerCase(), this.admin).subscribe(() => {
        this.close();
      });
    }
    
  }

  close(): void{
    this.dialogRef.close();
  }

  delete(): void{
    this.authService.deleteUser(this.id).subscribe(() => {
      this.close();
    });
  }
}

// export function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];

//     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//       // return if another validator has already found an error on the matchingControl
//       return;
//     }

//     // set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mustMatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   };
// }