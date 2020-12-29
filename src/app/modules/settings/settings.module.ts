import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { OverallComponent } from './overall/overall.component';
import { SensorComponent } from './sensor/sensor.component';



@NgModule({
  declarations: [
    SettingsComponent,
    OverallComponent,
    SensorComponent],
  imports: [
    CommonModule
  ]
})
export class SettingsModule { }
