import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../overview.component';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit{
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data){ dialogRef.disableClose = false;

  }


  save(): void{
    this.dialogRef.close(this.profileForm.value);
  }
  close(): void{
    this.dialogRef.close();
  }
}
