import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserT } from '../interfaces/User';



@Injectable({ providedIn: 'root' })
export class UserService {
  // userName = '';
  // role = '';
  // jwt = '';
  // id? = 0;

  userChange: EventEmitter<UserT> = new EventEmitter();

  constructor(private http: HttpClient) {}

  emitUserChangeEvent(userObj: UserT) {
    this.userChange.emit(userObj);
  }
  getUserChangeEmitter() {
    return this.userChange;
  }

  // getUser() {
  //   return {
  //     userName: this.userName,
  //     role: this.role,
  //     jwt: this.jwt,
  //     id: this.id,
  //   };
  // }

  // setUser(userName: string, role: string, jwt: string, id: number | undefined) {
  //   this.userName = userName
  //   this.role = role
  //   this.jwt = jwt
  //   this.id = id;    
  // }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
