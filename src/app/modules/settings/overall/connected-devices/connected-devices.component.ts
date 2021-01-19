import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-connected-devices',
  templateUrl: './connected-devices.component.html',
  styleUrls: [
    './../../settings.component.scss'
  ]
})
export class ConnectedDevicesComponent implements OnInit {
  public actuators = [];

  constructor(
    private settingsServive: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsServive.getActuators().subscribe(
      response => {
        for (let actuator of response.actuators) {
          this.actuators.push(
            {
              "id": actuator.id,
              "name":  actuator.name,
              "current_state": (actuator.type === "BOOLEAN" ? (actuator.current_state ? "ON" : "OFF") : (actuator.current_state != 0 ? "OPEN" : "CLOSED")),
              "type_name": actuator.type_name,
            }
          )
        }
                
      }
    );
  }

}
