import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionsModule } from './modules/sections/sections.module';
import { UserModule } from './modules/user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NotLoggedInGuard } from './services/guards/NotLoggedIn.guard';
import { LoggedInGuard } from './services/guards/LoggedIn.guard';
import { HttpRequestInterceptor } from './services/interceptors/HttpRequest.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';

export function getToken() {
  if (localStorage.getItem(AuthService.ACCESS_TOKEN) ==  null && localStorage.getItem(AuthService.REFRESH_TOKEN) !== null) {
    return localStorage.getItem(AuthService.REFRESH_TOKEN);
  }

  return localStorage.getItem(AuthService.ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SectionsModule,
        UserModule,
        HttpClientModule,
        SectionsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: getToken,
            allowedDomains: ['localhost:5000']//,
          }
        })
    ],
  providers: [
    LoggedInGuard,
    NotLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
