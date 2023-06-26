import { Component, OnInit } from '@angular/core';
import { UserT } from 'src/interfaces/User';
import { UserService } from 'src/services/users.service';
import { InterfacesService } from '../../services/interfaces.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user?: UserT;
  constructor(
    private interfaces: InterfacesService,
    private userService: UserService
  ) {}

  moveToLogin(): void {
    this.interfaces.navigateToLogin()
  }

  moveToHome(): void {
    this.user
      ? this.interfaces.navigateToVacations()
      : this.interfaces.navigateToHome();
  }

  logOut(): void {
    window.localStorage.removeItem('jwt');
  }

  moveToAddVacation(): void {
    this.interfaces.navigateToAddVacations()
  }

  moveToReports(): void {}

  ngOnInit() {
    this.userService.subscribeToEmitter((user: UserT) => (this.user = user));
  }
}
