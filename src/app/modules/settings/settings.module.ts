import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SensorComponent } from './sensor/sensor.component';
import { OverallModule } from './overall/overall.module';


@NgModule({
  declarations: [
    SettingsComponent,
    SensorComponent,
  ],
  imports: [
    CommonModule,
    OverallModule
  ]
})
export class SettingsModule { }
