import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vacation } from 'src/interfaces/Vacation';
import { InterfacesService } from 'src/services/interfaces.service';
import { VacationsService } from 'src/services/vacations.service';

@Component({
  selector: 'app-add-vac',
  templateUrl: './add-vac.component.html',
  styleUrls: ['./add-vac.component.css'],
})
export class AddVacComponent implements OnInit {
 @Input() vacation: Vacation = {
    id: 0,
    desc: '',
    destination: '',
    photo: '',
    dateStart: new Date(),
    dateEnd: new Date(),
    price: 0,
    followers: []
}

  constructor(
    private vacationService: VacationsService,
    private interfaces: InterfacesService
  ) {}

  addVac(form: NgForm) {
    form.value.id = this.vacationService.getVacId();
    if (!this.TDate(form.value.dateStart, form.value.dateEnd)) {
      return;
    }
    form.value.followers = [];

    this.vacationService.addVacation(form.value).subscribe({
      next: (res: any) => {
        alert('vacation inserted successfully');
        this.interfaces.navigateToVacations();

        return res;
      },
      error: (err: any) => {
        alert(err.error.text);
        return;
      },
    });
  }

  TDate(fromDate: string, toDate: string) {
    const ToDate = new Date();
    const FromDate = new Date(fromDate);

    if (
      FromDate.getTime() <= ToDate.getTime() ||
      new Date(toDate).getTime() <= FromDate.getTime()
    ) {
      alert('The Date must be a Future date');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.vacationService.setId();
  }
}
