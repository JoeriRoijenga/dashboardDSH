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

  ngOnInit(): void { }

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.getUsers();
  }

  getUsers() {
    let tempUsers = [];
    
    this.authService.getUsers().subscribe(response => {
      for (const user in response.users) {
        tempUsers.push(response.users[user]);
      }

      this.users = tempUsers;
    },
    error => {
      console.log('error:');
      console.log(error.error);
    }
  );
  }

  removeUser(id: number): void{
    this.authService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  openAddUser(): void{
   const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  editUser(id: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(id);
    
    dialogConfig.data = {
      id: id
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
}

