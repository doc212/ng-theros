import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Teaching} from 'app/models/teaching';
import {Klass} from 'app/models/klass';

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
    return this.api.get("/login").then((resp) => resp.json() as User[]);
  }

  getUser(id: number): Promise<UserWithTeachings> {
    return this.api.get("/user/" + id).then(resp => resp.json() as UserWithTeachings);
  }

  updateUser(user: User): Promise<void> {
    console.log("updating user", user);
    let _this = this;
    return this.api.put("/user", user).then(resp => {
      if (resp.status == 200) {
        let body = resp.json();
        _this.auth.updateToken(body.newToken);
      }
    });
  }

  getUserClasses(userId: number, subjectId: number): Promise<{ class: Klass, assigned: boolean, works: number }[]> {
    let currentClasses: { class: Klass, assigned: boolean, works: number }[] = [
      {
        class: { id: 1, code: "1CA" },
        assigned: true,
        works: 0
      },
      {
        class: { id: 2, code: "1CB" },
        assigned: true,
        works: 5
      },
      {
        class: { id: 3, code: "1CC" },
        assigned: false,
        works: 0
      },
      {
        class: { id: 4, code: "2CC" },
        assigned: false,
        works: 0
      }
    ];
    return Promise.resolve(currentClasses);
  }
}
