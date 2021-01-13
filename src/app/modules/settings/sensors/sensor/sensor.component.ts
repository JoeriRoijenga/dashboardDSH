import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: [
    './sensor.component.scss',
    './../sensors.component.scss',
    './../../settings.component.scss',
  ]
})
export class SensorComponent implements OnInit {

  @Input() header: string;
  @Input() type: number;

  public sensors = [];

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.getSensors(this.type).subscribe(
      response => {
        console.log(response);
        for (let sensor in response.sensors) {
          this.sensors.push(response.sensors[sensor]);
        }        
      }
    );
  }

}
