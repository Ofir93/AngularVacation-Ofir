import { Component, EventEmitter, Output } from '@angular/core';
import { InterfacesService } from '../../services/interfaces.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  providers: [InterfacesService],
})
export class GreetingComponent {
  images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rave_in_the_Henge_2005.jpg/640px-Rave_in_the_Henge_2005.jpg',
    'https://krayot.com/wp-content/uploads/2021/01/%D7%9E%D7%A1%D7%99%D7%91%D7%AA-%D7%98%D7%91%D7%A2.jpg',
    'https://cdn.shopify.com/s/files/1/0982/0722/files/6-1-2016_5-49-53_PM_1024x1024.jpg?7174960393118038727',
    'https://www.mesibatube.com/wp-content/uploads/2016/04/moksha-project-trance-party-israel.jpg',
    'https://idanvip.co.il/images/files/FormatFactorymaxresdefault.jpg',
    'https://mixmag.net/assets/uploads/images/_fullX2/rave-rebels-inline-1.jpg',
  ];

  constructor(private interfaces: InterfacesService) {}

  moveToLogin(): void {
    this.interfaces.navigateToLogin();
  }
}
