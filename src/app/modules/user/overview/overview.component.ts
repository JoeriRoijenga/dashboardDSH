import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import { AuthService } from '../../../services/auth.service';
import {stringify} from "querystring";

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
  adminrights: boolean;

  // users = [
  //   {
  //     name: 'Simon Koopmans',
  //     email: 'simon@email.com',
  //     adminrights: true
  //   },
  //   {
  //     name: 'Joeri Roijenga',
  //     email: 'joeri@email.com',
  //     adminrights: true
  //   },
  //   {
  //     name: 'Peter Kolhorn',
  //     email: 'peter@email.com',
  //     adminrights: false
  //   }
  //
  // ];
  public users = [];
 //

  ngOnInit(): void {
  }



  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.getUsers().subscribe(response => {
          console.log('result:');
          // this.users = response.users;
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
  removeUser(): void{

  }
  openAddUser(): void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: '',
      email: '',
    };


    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log('dialog output: ', data)
    );

  }



}

