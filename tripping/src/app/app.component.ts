import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterfacesService } from '../services/interfaces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InterfacesService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tripping';
  component: string = '';

  checkInterval = setInterval(this.interfaces.checkJwt(), 1200000);
  checkUser(): void {
    this.checkInterval;
  }
  constructor(private interfaces: InterfacesService) {}


  ngOnInit(): void {
    this.checkUser();
  }
  ngOnDestroy(): void {
    clearInterval(this.checkInterval);
  }
}
