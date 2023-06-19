import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminService } from 'src/services/admin.service';
import { InterfacesService } from 'src/services/interfaces.service';
import { UserService } from 'src/services/users.service';
import { VacationsService } from 'src/services/vacations.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GreetingComponent } from './greeting/greeting.component';
import { VacationCardsComponent } from './vacation-cards/vacation-cards.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GreetingComponent,
    VacationCardsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AdminService, InterfacesService, UserService, VacationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
