import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { User } from '../interfaces/User';

type SingObj = {
  loginName: string;
  loginPassword: string;
  loginCheck: boolean;
};

// type SingObjRes = {
//     loginName: string
//     loginPassword: string
//     loginCheck: boolean
// }

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  loginUrl = 'http://localhost:4000/auth/login';
  regUrl = 'http://localhost:4000/auth/register';

  constructor(private http: HttpClient) {}

  singIn(obj: SingObj) {
    // const {}
    window.localStorage.removeItem('jwt');
    this.http
      .post(this.loginUrl, {
        user_name: obj.loginName,
        password: obj.loginPassword,
      })
      .subscribe(
        (response : any) => {
          const { accessToken } = response.data;
          window.localStorage.setItem('jwt', accessToken);
          const decoded = jwt.decode(accessToken);
          return decoded
        },
        (error: any) => {
            error.response.data.errors
              ? alert(error.response.data.errors)
              : alert(error.response.data);
              return
          }
        );
  
        }
}
