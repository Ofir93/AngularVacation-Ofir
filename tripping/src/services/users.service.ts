import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { User, UserT } from '../interfaces/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser: UserT = {
    userName: '',
    role: 'user',
    jwt: '',
    id: 0,
  };

  userChange: EventEmitter<UserT> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getUser() {
    return this.currentUser;
  }

  subscribeToEmitter(func: (user: UserT) => void) {
    this.userChange.subscribe(func);
  }

  setUser(newUser: UserT) {
    this.currentUser = newUser;
    this.userChange.emit(newUser);
  }

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
