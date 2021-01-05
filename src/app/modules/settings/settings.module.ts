import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { OverallModule } from './overall/overall.module';
import { SensorsModule } from './sensors/sensors.module';


@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    OverallModule,
    SensorsModule,
  ]
})
export class SettingsModule { }
