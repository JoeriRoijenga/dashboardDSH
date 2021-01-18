import { Component, OnInit } from '@angular/core';
import { GraphsService } from "../../services/graphs.service";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})


export class GraphsComponent implements OnInit {
  public charts = [];

  constructor(
    private graphsService: GraphsService,
  ) { }

  ngOnInit(): void {       
    this.graphsService.getSensors().subscribe(response => {
      for(const sensor in response.sensors){        
        this.charts.push({id: response.sensors[sensor].id, name: response.sensors[sensor].name, type: response.sensors[sensor].type})
      }            
    });
  }
}