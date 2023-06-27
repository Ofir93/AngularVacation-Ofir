import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InterfacesService } from 'src/services/interfaces.service';
import { UserService } from 'src/services/users.service';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = true;
  reg = false;

  constructor(
    private auth: AuthenticationService,
    private inter: InterfacesService,
    private userServise: UserService
  ) {}

  loginPanel() {
    this.login = true;
    this.reg = false;
  }

  regPanel() {
    this.login = false;
    this.reg = true;
  }

  logIn(form: NgForm) {
    this.auth.singIn(form.value).subscribe({
      next: (response: any) => {
        window.localStorage.removeItem('jwt');
        window.localStorage.setItem('jwt', response.accessToken);
        this.userServise.setUser({
          userName: response.user_name,
          role: response.role,
          jwt: response.jwt,
          id: response.id,
        });
        this.inter.navigateToVacations();
        return response.accessToken;
      },
      error: (error: any) => {
        error.error.errors ? alert(error.error.errors) : alert(error.error);
        return;
      },
    });
  }

  register(form: NgForm) {
    this.auth.singUp(form.value).subscribe({
      next: (response: any) => {
        if (response === 'Nothing inserted User name already exists') {
          return alert('User name already exists please try again');
        }
        window.localStorage.setItem('jwt', response.accessToken);
        this.userServise.setUser({
          userName: response.userName,
          role: response.role,
          jwt: response.jwt,
          id: response.id,
        });

        this.inter.navigateToVacations();
        return response.accessToken;
      },
      error: (error: any) => {
        console.log(error);
        const err = error.error.errors
          .map((item: any) => {
            return item['message'] || item['msg'];
          })
          .join('\n');
        error.error.where ? alert(error.error.where + '\n' + err) : alert(err);
        return;
      },
    });
  }
}
