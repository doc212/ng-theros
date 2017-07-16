import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  getUsers(): Promise<User[]> {
    return this.api.get("/login").then((resp) => resp.json() as User[]);
  }

  getUser(id: number): Promise<User> {
    return this.api.get("/user/" + id).then(resp => resp.json() as User);
  }

  updateUser(user: User) : Promise<void> {
    console.log("updating user", user);
    let _this = this;
    return this.api.put("/user", user).then(resp => {
      if (resp.status == 200) {
        let body = resp.json();
        _this.auth.updateToken(body.newToken);
      }
    });
  }
}
