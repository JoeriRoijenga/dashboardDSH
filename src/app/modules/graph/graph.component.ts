import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
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

  this.graphsService.getSensorData().subscribe( response => {
      for(const data in response.sensor_data){
        if(response.sensor_data[data].id === 4){
          this.dataPoints.push({x: Number(moment(response.sensor_data[data].datetime).format("x")),  y: Number(response.sensor_data[data].value)});
        }      
      }
      chart.render();
    },
    error => {
      console.log('error');
      console.log(error.error);
    });

    // Testing adding data
    var a = 1610544635000;

    setInterval(() => {
      a += 10000;     
      this.dataPoints.push({x: a, y: Number(Math.floor((Math.random() * (20 - 19 + 1) + 20) * 100) / 100)});
      chart.render();      
    }, 3000);
  }

  public data(sensorData):void {   
    for(var i =0; i < sensorData.length; i++){
      if(sensorData[i].id === 4){
        this.dataPoints.push({x: sensorData[i].dateTime, y: Number(sensorData[i].value)});
      }
    }
  }

  updateChart(): void{
    console.log("update");
    let sensorData = [];

    this.graphsService.getSensorData().subscribe( response => {
        for(const data in response.sensor_data){
          sensorData.push(response.sensor_data[data]);
        }
        this.data(sensorData);
      },
      error => {
        console.log('error');
        console.log(error.error);
    });
  }

}