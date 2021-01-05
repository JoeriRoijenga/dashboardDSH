import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
