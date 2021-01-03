import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorComponent } from './sensor/sensor.component';
import { SensorsComponent } from './sensors.component';

@NgModule({
  declarations: [
    SensorComponent,
    SensorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SensorsComponent
  ]
})
export class SensorsModule { }
