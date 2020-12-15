import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { OverviewComponent } from './modules/user/overview/overview.component';
import { NotLoggedInGuard } from './services/guards/NotLoggedIn.guard';
import { LoggedInGuard } from './services/guards/LoggedIn.guard';
import { LogoutComponent } from './modules/user/logout/logout.component';

const routes: Routes = [
  { path: '', canActivate: [NotLoggedInGuard], children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  { path: '', canActivate: [LoggedInGuard], children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
