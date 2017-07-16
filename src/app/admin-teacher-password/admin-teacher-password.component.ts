import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/services/user.service';
import {User} from 'app/models/user';
import {RouteNames} from 'app/app.routing';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-teacher-password',
  templateUrl: './admin-teacher-password.component.html.slim',
  styleUrls: ['./admin-teacher-password.component.css']
})
export class AdminTeacherPasswordComponent implements OnInit, OnDestroy {
  private id: number;
  private sub: Subscription;
  user: User;
  busy = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params["id"];
      this.userService.getUser(id).then(user => this.user = user);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  resetPassword(password: string): void {
    this.busy = true;
    this.user.password = password;
    this.userService.updateUser(this.user).then(() => {
      this.busy = false;
      this.location.back();
    });
  }

  clickCancel(): void {
    this.location.back();
  }
}
