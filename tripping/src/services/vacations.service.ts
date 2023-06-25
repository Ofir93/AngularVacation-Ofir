import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from 'src/interfaces/Vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  getVacationsUrl = 'http://localhost:8008/vacations';
  vacations: Observable<Vacation[]> | undefined 
  //add? del? patch?
  constructor(private httpClient: HttpClient) {}

  getVacations(): Observable<Vacation[]> {
    this.vacations = this.httpClient.get<Vacation[]>(this.getVacationsUrl);
    return this.vacations
  }

}
