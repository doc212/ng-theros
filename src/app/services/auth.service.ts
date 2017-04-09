import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http } from "@angular/http";

const _CURRENT_USER_KEY = "theros.currentUser";
const storage = sessionStorage;
const API_URL = "http://localhost/~doc212/theros/app_dev.php/api";

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


  constructor(
    private http: Http
  ) {
    var json = storage.getItem(_CURRENT_USER_KEY);
    if (json) {
      this._currentUser = JSON.parse(json);
    }
  }

  getUsers(): Promise<User[]> {
    return this.http.get(API_URL + "/login").map((resp) => resp.json() as User[]).toPromise();

  }

  signIn(userId: number, password: string): Promise<boolean> {
    let _this = this;
    return new Promise<boolean>(function (resolve, reject) {
      _this.http.post(API_URL + "/login", {
        id: userId,
        password: password
      }).subscribe((resp) => {
        if (resp.ok) {
          _this.currentUser = { fullname: "Foo Bar", id: 1 };
          resolve(true);
        } else {
          console.log("response not ok", resp.status);
          _this.currentUser = null;
          resolve(false);
        }
      }, (err) => {
        console.log("signIn error", err);
        if (err.status == 403) {
          resolve(false);
        }
      });
    });
  }

  get isLoggedIn(): boolean { return !!this.currentUser; }

  signOut(): void {
    this.currentUser = null;
  }
}
