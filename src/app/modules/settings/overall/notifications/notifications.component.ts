import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    './notifications.component.scss',
    './../../settings.component.scss'
  ]
})
export class NotificationsComponent implements OnInit {

  public notification: number = 0;
  public sms: number = 0;
  public mail: number = 0;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.getNotificationSettings().subscribe(
      response => {
        for (var setting of response.settings) {
          this.notification = setting.type === "notifications" ? setting.on : this.notification;
          this.sms = setting.type === "sms" ? setting.on : this.sms;
          this.mail = setting.type === "mail" ? setting.on : this.mail;
        }       
      }
    );
  }

  changeSetting(setting) {
    this.notification = setting.id === "notifications" ? Number(setting.checked) : this.notification;
    this.sms = setting.id === "sms" ? Number(setting.checked) : this.sms;
    this.mail = setting.id === "mail" ? Number(setting.checked) : this.mail;
  }

  save() {
    this.settingsService.saveNotificationSettings(
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
