import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { DialogComponent } from './overview/dialog/dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    OverviewComponent,
    DialogComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class UserModule { }
