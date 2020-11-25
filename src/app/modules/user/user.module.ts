import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [LoginComponent, OverviewComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
