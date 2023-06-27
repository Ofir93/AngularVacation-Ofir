import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    followers: [],
  };

  @Input() edited = { edit: false, id: 0 };

  @Output() edit = new EventEmitter<{ edit: boolean; id: number }>();

  constructor(
    private vacationService: VacationsService,
    private interfaces: InterfacesService
  ) {}

  addVac(form: NgForm) {
    if (this.edited.edit && this.edited.id === this.vacation.id) {
      this.editVac(form);
      return;
    }

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

  emitEdit() {
    this.edit.emit({ edit: false, id: 0 });
  }

  editVac(form: NgForm) {
    if (!this.TDate(form.value.dateStart, form.value.dateEnd)) {
      return;
    }

    this.vacation.destination = form.value.destination;
    this.vacation.desc = form.value.desc;
    this.vacation.dateStart = form.value.dateStart;
    this.vacation.dateEnd = form.value.dateEnd;
    this.vacation.price = form.value.price;
    this.vacation.photo = form.value.photo;

    this.vacationService.editVacation(this.vacation).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.emitEdit();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.emitEdit();
  }

  ngOnInit(): void {
    this.vacationService.setId();
  }
}
