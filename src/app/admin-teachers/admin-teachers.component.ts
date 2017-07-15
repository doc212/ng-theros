import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html.slim',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  users: User[];
  constructor(
    public auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().then(users => this.users = users);
  }

  changeAdmin(user: User): void {
    console.log("%s is admin? %s", user.fullname, user.admin);
    this.userService.updateUser(user);
  }

  editUser(user: User): void {
    this.router.navigate(["admin/teachers", user.id]);
  }

}
