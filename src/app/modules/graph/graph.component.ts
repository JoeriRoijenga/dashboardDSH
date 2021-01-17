import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {GraphsService} from "../../services/graphs.service";
import * as CanvasJS from "src/assets/canvasjs-3.2.6/canvasjs.min.js";


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})


export class GraphComponent implements OnInit {
  public tempData = [];
  public dateData = [];
  public dataPoints = [];
  

  constructor(
    private dialog: MatDialog,
    private graphsService: GraphsService,
  ) {
  }

  ngOnInit(): void {   
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Live Temperatuur"
      },
      subtitles: [{
          text: "Try Zooming and Panning"
        },  
      ],
      axisX: {      
        valueFormatString: "HH:mm:ss",
        title: "timeline",
      },
      axisY: {
        title: "Temperature"
      },
      data: [
        {
          type: "line",      
          xValueType: "dateTime",          
          dataPoints: this.dataPoints,
        }
      ],
    });

    let lastDateTime: string;

    this.graphsService.getSensorData().subscribe(response => {
      for(const data in response.sensor_data){
        if(response.sensor_data[data].id === 4){
          this.dataPoints.push({x: Number(moment(response.sensor_data[data].datetime).format("x")),  y: Number(response.sensor_data[data].value)});
        }      
        
        if (Number(data) == (response.sensor_data.length - 1)) {
          lastDateTime = response.sensor_data[data].datetime;      
        }
      }

      console.log(lastDateTime);
      
      chart.render();
    });

    setInterval(() => {
      this.updateChart(chart, lastDateTime);
    }, 5000);
  }

  updateChart(chart, lastDateTime): void{
    this.graphsService.getSensorDataUpdate(lastDateTime).subscribe( response => {
      if (response.sensor_data.length > 0) {
        for(const data in response.sensor_data){
          if(response.sensor_data[data].id === 4){
            this.dataPoints.push({x: Number(moment(response.sensor_data[data].datetime).format("x")),  y: Number(response.sensor_data[data].value)});
          }      
        }
        chart.render();
      }
    });
  }

}