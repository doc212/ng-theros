import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(username: string, password: string) {
    this.auth.signIn(username, password);
  }

}
