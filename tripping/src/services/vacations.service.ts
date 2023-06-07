import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from 'src/interfaces/Vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  getVacationsUrl = 'http://localhost:4000/vacations';
  // getSpecificUsersUrl = 'http://localhost:3000/bulk-users';
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Vacation[]> {
    return this.httpClient.get<Vacation[]>(this.getVacationsUrl);
  }

  // getSpecificUsers(usersIds: number[]): Observable<User[]> {
  //   return this.httpClient.post<User[]>(this.getSpecificUsersUrl, usersIds);
  // }
}
