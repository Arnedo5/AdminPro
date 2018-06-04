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
  LoginGuardGuard,
  UploadFileService
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
    LoginGuardGuard,
    UploadFileService
  ],
  declarations: []
})

export class ServiceModule { }
