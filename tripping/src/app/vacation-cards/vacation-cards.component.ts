import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserT } from 'src/interfaces/User';
import { Vacation } from 'src/interfaces/Vacation';
import { UserService } from 'src/services/users.service';
import { VacationsService } from 'src/services/vacations.service';

@Component({
  selector: 'app-vacation-cards',
  templateUrl: './vacation-cards.component.html',
  styleUrls: ['./vacation-cards.component.css'],
})
export class VacationCardsComponent implements OnInit {
  vacations?: Vacation[];
  user?: UserT;

  constructor(
    private vacationService: VacationsService,
    private userService: UserService,
    public datepipe: DatePipe
  ) {}

  getVacations(): void {
    this.vacationService.getVacations().subscribe({
      next: (response: Vacation[]) => {
        this.vacations = response;
        console.log(this.vacations);
      },
      error: (error: any) => {
        console.log(error);
        return;
      },
    });
  }

  selectedUserItem(user: UserT) {
    this.user = user;
  }

  ngOnInit(): void {
    this.getVacations();

    this.selectedUserItem(this.userService.getUser());
  }
}
