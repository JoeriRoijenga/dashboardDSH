import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { OverviewComponent } from './modules/user/overview/overview.component';
import { NotLoggedInGuard } from './services/guards/NotLoggedIn.guard';
import { LoggedInGuard } from './services/guards/LoggedIn.guard';
import { LogoutComponent } from './modules/user/logout/logout.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { HomeComponent } from './modules/home/home.component';
import { GraphsComponent } from "./modules/graphs/graphs.component";

const routes: Routes = [
  { path: '', canActivate: [NotLoggedInGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: OverviewComponent },
    ]
  },

  { path: '', canActivate: [LoggedInGuard], children: [
      // { path: 'admin', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'graphs', component: GraphsComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
