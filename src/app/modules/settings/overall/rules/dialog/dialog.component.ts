import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public rulesForm: FormGroup;
  public chosenSensor = null;
  public chosenActuator = null;
  public chosenType = null;
  public chosenReponse = null;
  public submitted = false;

  public types = [
    { value: '>=' },
    { value: '<=' }
  ];

  public sensors = [];
  public actuators = [];

  public responses = [
    {value: true, text: "Open/On"},
    {value: false, text: "Close/Off"}
  ]

  constructor(
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    dialogRef.disableClose = false;
    
    this.settingsService.getAllSensors().subscribe(response => {
      for (let sensor of response.sensors) {
        if (this.chosenSensor ==  null) {
          this.chosenSensor = sensor.id;
        }
        this.sensors.push({id: sensor.id, text: sensor.name});        
      }
    });

    this.settingsService.getActuators().subscribe(response => {
      for (let actuator of response.actuators) {
        if (this.chosenActuator ==  null) {
          this.chosenActuator = actuator.id;
        }
        this.actuators.push({id: actuator.id, text: actuator.name});        
      }
    });

    this.chosenReponse = this.responses[0].value;
    this.chosenType = this.types[0].value;
  }

  ngOnInit(): void {
    this.rulesForm = this.formbuilder.group({
      sensors: [Validators.required],
      types: [Validators.required],
      value: ['', Validators.required],
      responses: [Validators.required],
      actuators: [Validators.required]
    });
  }



  get error() {return this.rulesForm.controls; }

  save(): void{
    if (this.rulesForm.invalid){
      return;
    }

    this.settingsService.addRule(this.chosenSensor, this.chosenType, Number(this.rulesForm.value.value), Boolean(this.chosenReponse), this.chosenActuator).subscribe();
    this.dialogRef.close();
  }

  close(): void{
    this.dialogRef.close();
  }
}