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
  public settings = [];

  public notification: number = 0;
  public sms: number = 0;
  public mail: number = 0;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.getSensors(this.type).subscribe(
      response => {
        for (let sensor in response.sensors) {
          this.sensors.push(response.sensors[sensor]);
        }        
      }
    );

    this.settingsService.getSensorTypeNotificationSettings(this.type).subscribe(
      response => {
        for (let setting of response.notification_settings) {
          this.notification = setting.type === "notifications" ? setting.on : this.notification;
          this.sms = setting.type === "sms" ? setting.on : this.sms;
          this.mail = setting.type === "mail" ? setting.on : this.mail;        }        
      });
  }

  changeSetting(setting) {
    this.notification = setting.id === "notifications" ? Number(setting.checked) : this.notification;
    this.sms = setting.id === "sms" ? Number(setting.checked) : this.sms;
    this.mail = setting.id === "mail" ? Number(setting.checked) : this.mail;
  }

  saveNotifications() {
    this.settingsService.saveSensorTypeNotificationSettings(
      this.type, 
      {
        "notifications": this.notification,
        "sms": this.sms,
        "mail": this.mail,
      }
      ).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
