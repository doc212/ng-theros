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
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-teacher-password',
  templateUrl: './admin-teacher-password.component.html.pug',
  styleUrls: ['./admin-teacher-password.component.css']
})
export class AdminTeacherPasswordComponent implements OnInit, OnDestroy {
  private id: number;
  private sub: Subscription;
  user: User;
  busy = false;
  teachings: { subject: Subject, classes: Klass[] }[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params["id"];
      this.displayUser(id);
    })
    this.childModal.onHide.subscribe(() => {
      this.displayUser(this.user.id);
    })
  }

  private displayUser(id: number) {
    this.userService.getUser(id).then(user => {
      this.user = user;
      this.teachings =
        from(user.teachings)
          .groupBy(t => t.subject.id, t => t)
          .select(g => {
            return {
              subject: g.first().subject,
              classes: g.select(t => t.class).orderBy(c => c.code).toArray()
            }
          }).toArray();
    });
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

  @ViewChild("childModal") public childModal: ModalDirective;
  currentSubject: Subject;
  currentClasses: Level[];
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
      _this.childModal.show();
    });
  }

  updateClassInfo(info: UserClassInfo): void {
    this.userService.updateClassInfo(this.user.id, this.currentSubject.id, info.class.id, info.assigned)
  }

  allAssigned(level: Level): boolean {
    return from(level.classes).all(c => c.assigned);

  }

  selectAll(level: Level): void {
    if (this.allAssigned(level)) {
      this.unselectAll(level);
    }
    else {
      level.classes.forEach(c => {
        c.assigned = true;
        this.updateClassInfo(c);
      });
    }
  }

  unselectAll(level: Level): void {
    level.classes.forEach(c => {
      if (c.works == 0)
        c.assigned = false;
      this.updateClassInfo(c);
    });
  }

  popoverText = "Cannot remove";
  getPopoverTriggers(c: UserClassInfo) {
    if (c.works > 0) {
      return "mouseenter:mouseleave";
    } else {
      return "";
    }

  }
}

class Level {
  level: string;
  classes: UserClassInfo[];
}
