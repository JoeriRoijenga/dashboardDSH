import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { EditDialogComponent } from '../../user/overview/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedIn: string = "";
  loggedInUrl: string = "";
  rights: boolean;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    this.loggedIn = "Logout";
    this.loggedInUrl = "logout"
    if (!this.authService.isLoggedIn()) {
      this.loggedIn = "Login";
      this.loggedInUrl = "login"
    }

    this.rights = this.authService.getRightsFromToken();
  }

  ngOnInit(): void { }

  editUser(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = {
      id: this.authService.getIdFromToken()
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe();
  }
}
