import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { ConnectedDevicesComponent } from './connected-devices/connected-devices.component';
import { OverallComponent } from './overall.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    ConnectedDevicesComponent,
    OverallComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OverallComponent
  ]
})
export class OverallModule { }
