import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from "app/services/api.service";

const _CURRENT_USER_KEY = "theros.currentUser";
const storage = sessionStorage;

@Injectable()
export class AuthService {

  private _currentUser: User;
  get currentUser(): User {
    return this._currentUser;
  }

  constructor(
    private api: ApiService
  ) { }

  loadFromStorage() {
    var json = storage.getItem(_CURRENT_USER_KEY);
    this.handleResponse(JSON.parse(json), false);
  }

  signIn(userId: number, password: string): Promise<boolean> {
    let _this = this;
    return new Promise<boolean>(function(resolve, reject) {
      _this.api.post("/login", {
        id: userId,
        password: password
      }).then((resp) => {
        if (resp.ok) {
          _this.handleResponse(resp.json());
          resolve(true);
        } else {
          console.log("response not ok", resp.status);
          _this.handleResponse(null);
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
    this.handleResponse(null);
  }

  private handleResponse(response: any, persist = true) {
    if (persist)
      storage.setItem(_CURRENT_USER_KEY, JSON.stringify(response));
    if (response) {
      this._currentUser = response.user;
      this.api.token = response.token;
    }
    else {
      this._currentUser = null;
      this.api.token = null;
    }
  }

  updateToken(token: string): void {
    if (!token)
      throw new Error("token cannot be empty");
    this.api.token = token;
    storage.setItem(_CURRENT_USER_KEY, JSON.stringify({
      user: this._currentUser,
      token: token
    }));
  }
}
