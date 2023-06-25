import { Component, OnInit } from '@angular/core';
import { InterfacesService } from '../../services/interfaces.service';
import { UserService } from 'src/services/users.service';
import { UserT } from 'src/interfaces/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user?: UserT
  subscription: any;
  constructor(private interfaces: InterfacesService, private userService: UserService){}
  
  moveToLogin(): void {
    this.interfaces.navigateToLogin();
  }

  moveToHome(): void {
    this.user ? this.interfaces.navigateToVacations() : this.interfaces.navigateToHome();
  }

  logOut(): void {
    window.localStorage.removeItem('jwt')
  }

  moveToAddVacation(): void {
  }

  moveToReports(): void {
  }


  
  
  ngOnInit() {
    this.subscription = this.userService
      .getUserChangeEmitter()
      .subscribe((user) => this.selectedUserItem(user));
  }
  selectedUserItem(user: UserT) {
    this.user = user;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
