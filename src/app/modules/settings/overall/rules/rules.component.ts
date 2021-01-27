import { templateSourceUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/modules/user/overview/edit-dialog/edit-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: [
    './../../settings.component.scss'
  ]
})
export class RulesComponent implements OnInit {
  public rules = [];

  constructor(
    private dialog: MatDialog,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.getRules();
  }
  
  openAddRule(): void{
    const dialogConfig = new MatDialogConfig();
 
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
 
    dialogConfig.data = {
      edit: false
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getRules();
      }, 1000);
    });
  }

  getRules() {
    let tempRules = [];

    this.settingsService.getRules().subscribe(response => {
      for (let rule of response.rules) {
        tempRules.push(
          {
            "id": rule.id,
            "sensor_name": rule.sensor_name,
            "actuator_name": rule.actuator_name,
            "type": rule.type,
            "value": rule.value,
            "respond_value": (rule.respond_value === "BOOLEAN" ? (rule.respond_value ? "ON" : "OFF") : (rule.respond_value != 0 ? "OPEN" : "CLOSE")),
          }
        );
      }

      this.rules = tempRules;
    });
  }

  openEditRule(id: number) {
    const dialogConfig = new MatDialogConfig();
 
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
 
    dialogConfig.data = {
      id: id,
      edit: true
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getRules();
      }, 1000);
    });  }
}
