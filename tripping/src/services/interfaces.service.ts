import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {
component: string = 'greet'

getComponent(): string  {
  return this.component
} 

changeComponent(component: string): string {
 this.component = component
 return this.component
}
  constructor() { }
}
