import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserT } from 'src/interfaces/User';
import { Vacation } from 'src/interfaces/Vacation';
import { VacationsService } from 'src/services/vacations.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
@Input() vacation!: Vacation
@Input() user?: UserT

@Output() followed = new EventEmitter<number>();

message: string = 'Follow'
pressed: boolean = false

constructor(private vacationService: VacationsService){}

follow(): void {
  this.message = "Unfollow"
  this.pressed = true
  
  // this.vacationService.editVacation()
}

unFollow(): void {
  this.message = "Follow"
  this.pressed = false

}

isFollowing() {
  for(let follower of this.vacation.followers){
    this.user!.id === +follower ? this.pressed = true : this.pressed = false
  }  
}

ngOnInit() {
  this.isFollowing()
}
}