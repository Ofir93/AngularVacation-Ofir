import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterfacesService {
  // component: string = 'greet';
  constructor(private http: HttpClient, private router: Router) {}


  checkJwt(): any {
    const storageToken = window.localStorage.getItem('jwt');

    if (!storageToken) {
      console.log('token not found');
      // this.changeComponent('greet')
      this.navigateToHome()
      return false; //
    }

  

    try {
      this.http
        .post('http://localhost:8008/auth/check', { accessToken: storageToken })
        .subscribe((response: any) => {
          const decoded = response.accessToken
          
          if (decoded === 'invalid token' || decoded === 'jwt expired') {
            window.localStorage.removeItem('jwt');
            alert('Invalid or expired premissions, please relogin');
            // this.changeComponent('greet')
            this.navigateToHome()
            return false;
          }
          this.router.navigateByUrl('/Vacations')
          return decoded;
        });

      //    {
      //     "accessToken": {
      //         "user_name": "Bliz",
      //         "role": "user",
      //         "id": 1,
      //         "iat": 1686735670,
      //         "exp": 1686736870
      //     }
      // }
    } catch (error) {
      console.log(error);
      return error
    }
  }

  navigateToHome() {
    this.router.navigateByUrl('/Home')
  }
  navigateToLogin() {
    this.router.navigateByUrl('/Login')
  }
  navigateToRegister() {
    this.router.navigateByUrl('/Register')
  }
  navigateToVacations() {
    this.router.navigateByUrl('/Vacations')
  }



  // getComponent(): string {
  //   return this.component;
  // }

  // changeComponent(component: string): string {
  //   this.component = component;
  //   return this.component;
  // }




}
