import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class AuthService {

  currentUser: User;

  constructor() { }

  signIn(username: string, password: string): Promise<boolean> {
    if (username == "foo" && password == "bar") {
      this.currentUser = { fullName: "Foo Bar" };
    } else {
      this.currentUser = null;
    }
    return Promise.resolve(!!this.currentUser);
  }

}
