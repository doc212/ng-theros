import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/services/user.service';
import {User} from 'app/models/user';
import {RouteNames} from 'app/app.routing';
import {Location} from '@angular/common';
import * as _ from "lodash";
import {Teaching} from 'app/models/teaching';
import {Subject} from 'app/models/subject';
import {Klass} from 'app/models/klass';
import {from} from 'linq';
import { Modal } from 'angular2-modal/plugins/bootstrap'

@Component({
  selector: 'app-admin-teacher-password',
  providers: [Modal],
  templateUrl: './admin-teacher-password.component.html.slim',
  styleUrls: ['./admin-teacher-password.component.css']
})
export class AdminTeacherPasswordComponent implements OnInit, OnDestroy {
  private id: number;
  private sub: Subscription;
  user: User;
  busy = false;
  teachings: { subject: Subject, classes: Klass[] }[];

  constructor(
    private modal : Modal,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params["id"];
      this.userService.getUser(id).then(user => {
        this.user = user;
        this.teachings =
          from(user.teachings)
            .groupBy(t => t.subject.id, t => t)
            .select(g => {
              return {
                subject: g.first().subject,
                classes: g.select(t => t.class).toArray()
              }
            }).toArray();
      });
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

  editClick(): void {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`
                <h4>Alert is a classic (title/body/footer) 1 button modal window that
                does not block.</h4>
                <b>Configuration:</b>
                <ul>
                    <li>Non blocking (click anywhere outside to dismiss)</li>
                    <li>Size large</li>
                    <li>Dismissed with default keyboard key (ESC)</li>
                    <li>Close wth button click</li>
                    <li>HTML content</li>
                </ul>`)
      .open();
  }
}
