import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserT } from 'src/interfaces/User';
import { Vacation } from 'src/interfaces/Vacation';
import { VacationsService } from 'src/services/vacations.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  @Input() vacation!: Vacation;
  @Input() user?: UserT;

  @Output() followed = new EventEmitter<number>();

  message: string = 'Follow';
  pressed: boolean = false;

  constructor(private vacationService: VacationsService) {}

  follow(): void {
    this.vacation.followers.push(this.user!.id);
    this.vacationService.editVacation(this.vacation).subscribe((data) => {
      this.message = 'Unfollow';
      this.pressed = true;
    });
  }

  unFollow(): void {
    const index = this.vacation.followers.indexOf(this.user!.id)
    this.vacation.followers.splice(index, 1);
    this.vacationService.editVacation(this.vacation).subscribe((data) => {
      this.message = 'Follow';
      this.pressed = false;
      });

  }

  isFollowing() {
    for (let follower of this.vacation.followers) {
      this.user!.id === follower
        ? ((this.pressed = true), (this.message = 'Unfollow'))
        : '';
    }
  }

  ngOnInit() {
    this.isFollowing();
  }
}
