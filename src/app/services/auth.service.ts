import { Injectable } from '@angular/core';
import {User} from '../models/user';

const _CURRENT_USER_KEY = "theros.currentUser";
const storage = sessionStorage;

@Injectable()
export class AuthService {

  private _currentUser: User;
  get currentUser(): User {
    return this._currentUser;
  }
  set currentUser(user: User) {
    this._currentUser = user;
    storage.setItem(_CURRENT_USER_KEY, JSON.stringify(user));
  }


  constructor() {
    var json = storage.getItem(_CURRENT_USER_KEY);
    if (json) {
      this._currentUser = JSON.parse(json);
    }
  }

  signIn(username: string, password: string): Promise<boolean> {
    if (username == "foo" && password == "bar") {
      this.currentUser = { fullName: "Foo Bar" };
    } else {
      this.currentUser = null;
    }
    return Promise.resolve(!!this.currentUser);
  }

  get isLoggedIn(): boolean { return !!this.currentUser; }

  signOut(): void {
    this.currentUser = null;
  }
}
