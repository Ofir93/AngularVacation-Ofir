import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfacesService } from 'src/services/interfaces.service';
import { UserService } from 'src/services/users.service';
import { VacationsService } from 'src/services/vacations.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GreetingComponent } from './greeting/greeting.component';
import { VacationCardsComponent } from './vacation-cards/vacation-cards.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AddVacComponent } from './vacation-cards/add-vac/add-vac.component';
import { ReportsComponent } from './reports/reports.component';
import { FollowComponent } from './vacation-cards/follow/follow.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GreetingComponent,
    VacationCardsComponent,
    LoginComponent,
    AddVacComponent,
    ReportsComponent,
    FollowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [DatePipe, InterfacesService, UserService, VacationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
