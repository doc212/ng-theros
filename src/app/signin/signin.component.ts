import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(username: string, password: string) {
    this.auth.signIn(username, password).then((loggedIn) => {
      console.log("logged in", loggedIn);
      if (loggedIn) {
        this.router.navigate(["home"]);
      }
    });
  }

}
