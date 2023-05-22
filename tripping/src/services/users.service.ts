import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken'
import { User } from 'src/interfaces/User';
import { Observable } from 'rxjs';
// import * as dotenv from 'dotenv'

// dotenv.config()

@Injectable({
  providedIn: 'root'
}) 
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  // checkUser
}
