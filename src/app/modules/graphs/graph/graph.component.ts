import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service.js';
import { GraphsService } from 'src/app/services/graphs.service';
import * as CanvasJS from "./canvasjs.min.js";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: [
    './../graphs.component.scss',
  ]
})
export class GraphComponent implements AfterViewInit {
  @Input() chart;

  public dataPoints = [];
  public lastDateTime: string = "";
  public hide: boolean = false;

  private interval;

  constructor(
    private graphsService: GraphsService,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    let chart = new CanvasJS.Chart("chartContainer-" + this.chart.id, {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Live " + this.chart.type + ": " + this.chart.name
      },
      axisX: {      
        valueFormatString: "YYYY-MM-DD HH:mm:ss",
        title: "timeline",
      },
      axisY: {
        title: this.chart.type
      },
      data: [
        {
          type: "line",      
          xValueType: "dateTime",          
          dataPoints: this.dataPoints,
        }
      ],
    });    

    this.graphsService.getSensorData(this.chart.id).subscribe(response => {
      if (response.sensor_data.length == 0) {
        this.hide = true;
      } else {
        for(const data in response.sensor_data){
          this.dataPoints.push({x: Number(moment(response.sensor_data[data].datetime).format("x")),  y: Number(response.sensor_data[data].value)});
          
          if (Number(data) == (response.sensor_data.length - 1)) {
            this.lastDateTime = response.sensor_data[data].datetime;      
          }
        }
        
        chart.render();
      }
    });

    clearInterval(this.interval);
    
    this.interval = setInterval(() => {
      if (!this.updateChart(chart)) {
        clearInterval(this.interval);
      }
    }, 5000);
  }

  updateChart(chart): boolean | void {
    this.graphsService.getSensorDataUpdate(this.chart.id, this.lastDateTime).subscribe(response => {            
      if (response.sensor_data.length > 0) {
        for(const data in response.sensor_data){
          this.dataPoints.push({x: Number(moment(response.sensor_data[data].datetime).format("x")),  y: Number(response.sensor_data[data].value)});

          if (Number(data) == (response.sensor_data.length - 1)) {
            this.lastDateTime = response.sensor_data[data].datetime;
          }
        }
        
        chart.render();
      }
    });

    if (this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
