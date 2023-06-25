import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './auth/login/login.component';
import { VacationCardsComponent } from './vacation-cards/vacation-cards.component';

const routes: Routes = [
{ path: 'Home', component: GreetingComponent },
{ path: 'Login', component: LoginComponent },
{ path: 'Vacations', component: VacationCardsComponent },
{ path: '', redirectTo: 'Home', pathMatch: 'full' },
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
