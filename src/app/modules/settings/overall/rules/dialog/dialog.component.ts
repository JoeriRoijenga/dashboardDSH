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
    this.submitted = true;

    if (this.rulesForm.invalid){
      return;
    }

    this.settingsService.addRule(this.rulesForm.value.sensors, this.rulesForm.value.types, this.rulesForm.value.value, Boolean(this.rulesForm.value.responses), this.rulesForm.value.actuators);
    this.dialogRef.close();
  }

  close(): void{
    this.dialogRef.close();
  }
}