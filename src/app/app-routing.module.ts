import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import {OverviewComponent} from './modules/user/overview/overview.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
