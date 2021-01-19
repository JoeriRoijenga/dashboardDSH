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
import { SettingsModule } from './modules/settings/settings.module';
import { HomeComponent } from './modules/home/home.component';
import { GraphsComponent } from "./modules/graphs/graphs.component";
import { GraphComponent } from './modules/graphs/graph/graph.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphsComponent,
    GraphComponent
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
      SettingsModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
