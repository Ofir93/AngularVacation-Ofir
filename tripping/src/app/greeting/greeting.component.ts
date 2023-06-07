import { Component, EventEmitter, Output } from '@angular/core';
import { InterfacesService } from '../../services/interfaces.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  providers: [InterfacesService],
})
export class GreetingComponent {
  @Output() componentChange = new EventEmitter<string>();


  constructor(private interfaces: InterfacesService) {}

  componentChanged(component: string){
  this.componentChange.emit(component)
  }

  // changeComponent(component: string): void {
  //   this.interfaces.changeComponent(component);
  // }

}
