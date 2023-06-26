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
  length: number | undefined
  //add? del? patch?
  constructor(private httpClient: HttpClient) {}

  getVacations(): Observable<Vacation[]> {
    this.vacations = this.httpClient.get<Vacation[]>(this.getVacationsUrl);
    return this.vacations
  }
  
  deleteVacation(id: number) {
  return this.httpClient.delete(this.getVacationsUrl+'/'+id)
  }

  editVacation(vacObj: Vacation) {
    return this.httpClient.patch(this.getVacationsUrl+'/'+vacObj.id, vacObj)
  }

  addVacation(vacObj: Vacation) {
    return this.httpClient.post(this.getVacationsUrl, vacObj)
  }

  setId(){
    this.getVacations().subscribe(data => this.length = data.length + 1)
    return
  }
  
  getVacId(){
    return this.length
  }
}
