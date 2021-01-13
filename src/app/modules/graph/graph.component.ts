import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
//import * as CanvasJS from "canvasjs";
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

  let sensorData = [];
  let dspLenght = 0;
  let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      title:{
        text:"live temperatuur"
      },
      data:[{
        type: "spline",
        dataPoints: this.dataPoints,
      }]
    });
    chart.render();
    data();
    console.log(this.dataPoints);
    this.graphsService.getSensorData().subscribe( response => {
      console.log('result');
      console.log(response);
      for(const data in response.sensor_data){
          sensorData.push(response.sensor_data[data]);
        }
      console.log(sensorData);
     // console.log(dataPoints);
      },
      error => {
        console.log('error');
        console.log(error.error);
      },

    );
    function data() {
      // for (let temp of sensorData) {
      //   console.log("weirddd"+ temp.value);
      //   if (temp.id === 4) {
      //     dataPoints.push({x: temp.dateTime, y: temp.value});
      //     console.log('daaattaaaa'+ dataPoints);
      //   }
      // }
      for(var i =0; i < sensorData.length; i++){
        console.log(sensorData[i]);
        if(sensorData[i].id === 4){
          console.log(sensorData[i]);
          this.dataPoints.push({x:sensorData[i].dateTime, y:sensorData[i].value});
        }
      }
     // console.log('datapointsssss');
     // console.log(dataPoints);
      // let selectsensor = sensorData.find(sensorData => sensorData.id === 4)
      // dataPoints.push({x:})
      // console.log('dataPoints');
      // console.log(dataPoints);
      dspLenght = this.dataPoints.length;
      console.log(dspLenght);
      // chart.render();
    }
    function updateChart(){

    }

  }


  updateChart(): void{

  }

}
    // let dataPoints = [];
    // let dpsLength = 0;
    // let chart = new CanvasJS.Chart("chartContainer",{
    //   exportEnabled: true,
    //   title:{
    //     text:"Live Chart with Data-Points from External JSON"
    //   },
    //   data: [{
    //     type: "spline",
    //     dataPoints : dataPoints,
    //   }]
    // })


    // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {
    //   $.each(data, function(key, value){
    //     dataPoints.push({x: value[0], y: parseInt(value[1])});
    //   });
    //   dpsLength = dataPoints.length;
    //   chart.render();
    //   updateChart();
    // });

    // function updateChart() {
    //   $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
    //     $.each(data, function(key, value) {
    //       dataPoints.push({
    //         x: parseInt(value[0]),
    //         y: parseInt(value[1])
    //       });
    //       dpsLength++;
    //     });
    //
    //     if (dataPoints.length >  20 ) {
    //       dataPoints.shift();
    //     }
    //     chart.render();
    //     setTimeout(function(){updateChart()}, 1000);
    //   });
