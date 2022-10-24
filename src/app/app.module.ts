import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldModule} from '@angular/cdk/text-field';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { BackEndRestClient } from './service/BackEndRestClient';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsComponent } from './tabs/tabs.component';
import { BackendauthComponent } from './backendauth/backendauth.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { ManagetabComponent } from './managetab/managetab.component';
import { SharedComponent } from './shared/shared.component';
import { UserLogComponent } from './user-log/user-log.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BackendauthComponent,
    RegisteruserComponent,
    ManagetabComponent,
    UserLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [BackEndRestClient, SharedComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
