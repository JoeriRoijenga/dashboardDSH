import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionsModule } from './modules/sections/sections.module';
import { UserModule } from './modules/user/user.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NotLoggedInGuard } from './services/guards/NotLoggedIn.guard';
import { LoggedInGuard } from './services/guards/LoggedIn.guard';
import { HttpRequestInterceptor } from './services/interceptors/HttpRequest.interceptor';

@NgModule({
  declarations: [
    AppComponent,
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
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    LoggedInGuard,
    NotLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
