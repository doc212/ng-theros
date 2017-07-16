import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html.slim',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  users : User[];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().then(users => this.users = users);
  }

  changeAdmin(user:User) : void
  {
    console.log("%s is admin? %s", user.fullname, user.admin);
  }

}
