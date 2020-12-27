import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { OverviewComponent } from './modules/user/overview/overview.component';
import { NotLoggedInGuard } from './services/guards/NotLoggedIn.guard';
import { LoggedInGuard } from './services/guards/LoggedIn.guard';
import { LogoutComponent } from './modules/user/logout/logout.component';
import { SettingsComponent } from './modules/settings/settings.component';

const routes: Routes = [
  { path: '', canActivate: [NotLoggedInGuard], children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  { path: '', canActivate: [LoggedInGuard], children: [
      { path: 'admin', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
