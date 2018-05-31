import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Http
import { HttpClientModule } from '@angular/common/http';


import {
  SettingsService,
  SidebarService,
  SharedService,
  MailingService,
  UserService,
  LoginGuardGuard
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    MailingService,
    UserService,
    LoginGuardGuard
  ],
  declarations: []
})

export class ServiceModule { }
