import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldModule} from '@angular/cdk/text-field';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { BackEndRestClient } from './service/BackEndRestClient';

import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsComponent } from './tabs/tabs.component';
import { BackendauthComponent } from './backendauth/backendauth.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BackendauthComponent,
    RegisteruserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [BackEndRestClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
