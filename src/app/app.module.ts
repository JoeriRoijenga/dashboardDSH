import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionsModule } from './modules/sections/sections.module';
import {UserModule} from './modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SectionsModule,
        UserModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
