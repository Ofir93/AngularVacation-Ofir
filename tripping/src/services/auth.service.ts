import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/User';

type SingObj = {
  loginName: string;
  loginPassword: string;
  loginCheck: boolean;
};

type SingObjRes = {
  registerFirstName: string;
  registerLastname: string;
  registerUsername: string;
  registerPassword: string;
  registerCheck: boolean;
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  loginUrl = 'http://localhost:8008/auth/login';
  regUrl = 'http://localhost:8008/auth/register';

  constructor(private http: HttpClient) {}

  singIn(obj: SingObj): Observable<Object> {
    console.log('singin in');
    return this.http.post(this.loginUrl, {
      user_name: obj.loginName,
      password: obj.loginPassword,
    });
  }

  singUp(obj: SingObjRes): Observable<Object> {
    console.log('singin up');

    return this.http.post(this.regUrl, {
      user_name: obj.registerUsername,
      password: obj.registerPassword,
      first_name: obj.registerFirstName,
      last_name: obj.registerLastname,
    });
  }
}
