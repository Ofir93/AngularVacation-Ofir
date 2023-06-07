import { Component, OnInit } from '@angular/core';
import { InterfacesService } from '../services/interfaces.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InterfacesService]
})
export class AppComponent implements OnInit {
  title = 'tripping';
  component: string = '';
  // onKey(component: string): void {
  //   this.component = component;
  // }
  getInterface(): void {
     this.component = this.interfaces.getComponent()
    }
  constructor(private interfaces: InterfacesService){}

    changeComponent(component: string): void {
    this.interfaces.changeComponent(component);
    this.component = component;
  }


  ngOnInit(): void {
    this.getInterface()
  }
}
