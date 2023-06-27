import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  edit = { edit: false, id: 0 };

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

  editVacation(id: number) {
    this.edit.edit = true;
    this.edit.id = id;
  }

  onEditChange(event: { edit: boolean; id: number }) {
    this.edit = event;
  }

  deleteVacation(id: number): void {
    this.vacationService.deleteVacation(id).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.getVacations();
        return res;
      },
      error: (err: any) => {
        console.log(err);
        return;
      },
    });
  }

  orderVacByFollow(vacations: Vacation[]) {
    return vacations
      .map((vacation) => ({
        ...vacation,
        following:
          vacation.followers.findIndex(
            (followerId) => followerId == this.user?.id
          ) > -1,
      }))
      .sort((a, b) => {
        if (a.following != b.following) return a.following ? -1 : 1;
        return 0;
      });
  }

  ngOnInit(): void {
    this.userService.subscribeToEmitter((user: UserT) => (this.user = user));
    this.selectedUserItem(this.userService.getUser());
    this.getVacations();
    console.log(this.user);
  }
}
