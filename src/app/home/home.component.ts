import { Component, OnInit } from '@angular/core';

import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  get user() : User{
    return this.auth.currentUser;
  }

}
