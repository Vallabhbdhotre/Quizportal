import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { AuthenticatedLyoutComponent } from './authenticated-lyout/authenticated-lyout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';


@NgModule({
  declarations: [
    AuthenticatedLyoutComponent,
    NavbarComponent,
    SidebarComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedLayoutRoutingModule
  ]
})
export class AuthenticatedLayoutModule { }
