import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminService } from 'src/services/admin.service';
import { InterfacesService } from 'src/services/interfaces.service';
import { UsersService } from 'src/services/users.service';
import { VacationsService } from 'src/services/vacations.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AdminService, InterfacesService,UsersService, VacationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
