import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: [
    './../../settings.component.scss'
  ]
})
export class RulesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  
  openAddRule(): void{
    const dialogConfig = new MatDialogConfig();
 
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true; 
 
     const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
     dialogRef.afterClosed();
   }
}
