import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { ConnectedDevicesComponent } from './connected-devices/connected-devices.component';
import { OverallComponent } from './overall.component';
import { RulesComponent } from './rules/rules.component';
import { DialogComponent } from './rules/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotificationsComponent,
    ConnectedDevicesComponent,
    OverallComponent,
    RulesComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  exports: [
    OverallComponent,
  ]
})
export class OverallModule { }
