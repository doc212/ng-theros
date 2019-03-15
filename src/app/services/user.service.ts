import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Teaching} from 'app/models/teaching';
import {Klass, UserClassInfo} from 'app/models/klass';

class UserWithTeachings extends User {
  teachings: Teaching[];
}



@Injectable()
export class UserService {

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  getUsers(): Promise<User[]> {
    return this.api.get("/login").then((resp) => resp.json());
  }

  getUser(id: number): Promise<UserWithTeachings> {
    return this.api.get("/user/" + id).then(resp => resp.json());
  }

  updateUser(user: User): Promise<void> {
    console.log("updating user", user);
    let _this = this;
    return this.api.put("/user", user).then(resp => {
      if (resp.status == 200) {
        resp.json().then((body) => {
          _this.auth.updateToken(body.newToken);
        });
      }
    });
  }

  getUserClasses(userId: number, subjectId: number): Promise<UserClassInfo[]> {
    return this.api.get("/user_classes", { subjectId: subjectId, userId: userId }).then(response => response.json())
  }

  updateClassInfo(userId: number, subjectId: number, classId: number, assigned: boolean): void {
    this.api.put("/user_classes", {
      userId: userId, classId: classId, assigned: assigned, subjectId: subjectId
    })
  }
}
