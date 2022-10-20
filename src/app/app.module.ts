import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BackEndRestClient } from './service/BackEndRestClient';

import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsComponent } from './tabs/tabs.component';
import { BackendauthComponent } from './backendauth/backendauth.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BackendauthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [BackEndRestClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
