import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: [
    './overall.component.scss',
    './../settings.component.scss'
  ]
})
export class OverallComponent implements OnInit {
  // private savedData = {
  //   "notifications": null,
  //   "sms": null,
  //   "mail": null,
  // }

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  // saveAll() {
  //   this.settingsService.saveNotificationSettings(this.savedData).subscribe(
  //     response => {
  //       console.log(response);
  //     }
  //   );
  // }

  // saveNotification(data: any) {
  //   this.savedData[Object.keys(data)[0]] = Object.values(data)[0];
  // }
}
