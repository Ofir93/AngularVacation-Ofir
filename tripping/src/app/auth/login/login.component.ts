import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  login = true
  reg = false


  loginPanel() {
    this.login = true
    this.reg = false
  }

  regPanel() {
    this.login = false
    this.reg = true
  }


  logIn(form: NgForm){


  }

  register(form: NgForm){

  }
}
