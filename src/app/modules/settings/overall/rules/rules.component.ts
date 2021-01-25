import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
 
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getRules();
      }, 2000);
    });
  }

  getRules() {
    this.rules = [];
    this.settingsService.getRules().subscribe(response => {
      for (let rule of response.rules) {
        rule.respond_value = 
        this.rules.push(
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
    });
  }

  openEditRule(id: number) {
    const dialogConfig = new MatDialogConfig();
 
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
 
    dialogConfig.data = {
      id: id
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed();
  }
}
