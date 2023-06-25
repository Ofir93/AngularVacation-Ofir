import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import * as jwt from 'jsonwebtoken'
import { AuthenticationService } from '../../../services/auth.service';
import { InterfacesService } from 'src/services/interfaces.service';
import { UserService } from 'src/services/users.service';

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
        this.userServise.emitUserChangeEvent({
          userName: response.user_name,
          role: response.role,
          jwt: response.jwt,
          id: response.id,
        });
        this.inter.navigateToVacations();
        console.log(response);
        return response.accessToken;
      },
      error: (error: any) => {
        console.log(error);
        error.error.errors ? alert(error.error.errors) : alert(error.error);
        return;
      },
    });
  }

  register(form: NgForm) {
    this.auth.singUp(form.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response === 'Nothing inserted User name already exists') {
          return alert('User name already exists please try again');
        }
        window.localStorage.setItem('jwt', response.accessToken);
        this.userServise.emitUserChangeEvent({
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
