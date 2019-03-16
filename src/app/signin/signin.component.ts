import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from "app/models/user";
import { IUserService } from 'app/services/interfaces/IUserService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html.pug',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private router: Router,
    private userService : IUserService,
    private auth: AuthService
  ) { }

  selectedUser: User = null;
  users: User[] = null;

  ngOnInit() {
    this.userService.getUsers().then((users) => {
      this.users = [null].concat(users);
      this.selectedUser = null;
    });
  }

  signIn(password: string) {
    if (!this.selectedUser) {
      console.log("no user selected");
    } else {
      this.auth.signIn(this.selectedUser.id, password)
        .then((loggedIn) => {
          console.log("logged in", loggedIn);
          if (loggedIn) {
            this.router.navigate(["home"]);
          }
        });
    }
  }

}
