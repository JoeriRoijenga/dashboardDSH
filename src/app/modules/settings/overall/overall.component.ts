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
  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }
}
