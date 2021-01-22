import { Component, OnInit, Inject, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import { AuthService } from '../../../services/auth.service';
import {stringify} from "querystring";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {newArray} from "@angular/compiler/src/util";

// let dialogRef = dialog.open(UserprofileComponent, {height:'400px', width: '600px'});

export interface DialogData {
  name: string;
  email: string;
  adminrights: boolean;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  title = 'User overview';
  name: string;
  email: string;

  public users = [];
  public userData = [];
  public firstname: string;
  public lastname: string;
  public emailEdit: string;
  public idEdit: number;
  //public passwordEdit: string;
  ngOnInit(): void {
  }

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.getUsers().subscribe(response => {
          console.log('result:');

          for (const user in response.users) {
            this.users.push(response.users[user]);
          }
        },
        error => {
          console.log('error:');
          console.log(error.error);
        }
      );
  }



  removeUser(id: number): void{
    console.log(id);
    this.authService.deleteUser(id).subscribe(response => {
      console.log(response.message);
    });
  }

  openAddUser(): void{
   const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // dialogConfig.data = {
    //   name: '',
    //   email: '',
    // };


    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log('dialog output: ', data)
    );

  }
  editUser(id: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.authService.getUser(id).subscribe(response=>{
     console.log(response);
     // console.log(response.user[0].name);
      this.userData = response.user[0];
     //  var names = String(response.user[0].name);
     //  let newArray = [];
     //  newArray = names.split(/(\s+)/);
     //
     // this.firstname = newArray[0];
     // this.lastname = newArray[2];
     // this.emailEdit = response.user[0].email;
     // this.idEdit = response.user[0].id;
     //this.passwordEdit = response.user[0].password;

    });


    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log('dialog output: ', data)
    );

  }


}

