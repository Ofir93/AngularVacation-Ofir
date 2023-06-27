import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from 'src/interfaces/Vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacationsService {
  getVacationsUrl = 'http://localhost:8008/vacations';
  length: number | undefined;
  constructor(private httpClient: HttpClient) {}

  getVacations(): Observable<Vacation[]> {
    return this.httpClient.get<Vacation[]>(this.getVacationsUrl);
  }

  deleteVacation(id: number) {
    return this.httpClient.delete(this.getVacationsUrl + '/' + id);
  }

  editVacation(vacObj: Vacation) {
    return this.httpClient.patch(
      this.getVacationsUrl + '/' + vacObj.id,
      vacObj
    );
  }

  addVacation(vacObj: Vacation) {
    return this.httpClient.post(this.getVacationsUrl, vacObj);
  }

  setId() {
    this.getVacations().subscribe((data) => {
      let i = 1;
      for (let vac of data) {
        vac.id === i ? i++ : (this.length = i);
      }
    });
    return;
  }

  getVacId() {
    return this.length;
  }
}
