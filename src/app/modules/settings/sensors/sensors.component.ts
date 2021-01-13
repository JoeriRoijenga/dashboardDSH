import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  types = [];

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.getSensorTypes().subscribe(response => {
      for (let sensor_type in response.sensor_types) {
        this.types.push(response.sensor_types[sensor_type])
      }      
    });
  }

}
