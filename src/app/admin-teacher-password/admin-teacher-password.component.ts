import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/services/user.service';
import {User} from 'app/models/user';
import {RouteNames} from 'app/app.routing';
import {Location} from '@angular/common';
import * as _ from "lodash";
import {Teaching} from 'app/models/teaching';
import {Subject} from 'app/models/subject';
import {Klass, UserClassInfo} from 'app/models/klass';
import {from} from 'linq';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from "angular2-modal";


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
    private modal: Modal,
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

  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
  currentSubject: Subject;
  currentClasses: Array<{ level: string; classes: UserClassInfo[] }>;
  editClick2(subject: Subject): void {
    this.currentSubject = subject;
    let _this = this;
    this.userService.getUserClasses(this.user.id, subject.id).then(currentClasses => {
      _this.currentClasses =
        from(currentClasses)
          .groupBy(c => c.class.code[0], c => c)
          .select(g => {
            return {
              level: g.key(),
              classes: g.orderBy(c => c.class.code).toArray()
            };
          }).toArray();
      _this.modal.open(_this.templateRef, overlayConfigFactory({ isBlocking: false }, BSModalContext))
    });
  }

  updateClassInfo(info: UserClassInfo): void {
    this.userService.updateClassInfo(this.user.id, this.currentSubject.id, info.class.id, info.assigned)
  }
}
