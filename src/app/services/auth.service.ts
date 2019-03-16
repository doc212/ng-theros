import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LoginResponse } from 'app/models/DTOs/LoginResponse';
import { ILoginService } from './interfaces/ILoginService';
import { ApiService } from './api.service';

const _CURRENT_USER_KEY = "theros.currentUser";
const storage = sessionStorage;

@Injectable()
export class AuthService {

  private _currentUser: User;
  get currentUser(): User {
    return this._currentUser;
  }

  constructor(
    private _loginService: ILoginService,
    private api : ApiService
  )
  {
  }

  loadFromStorage() {
    var json = storage.getItem(_CURRENT_USER_KEY);
    this.handleResponse(JSON.parse(json), false);
  }

  signIn(userId: number, password: string): Promise<boolean> {
    let _this = this;
    return new Promise<boolean>(function(resolve, reject) {
      _this._loginService.login(userId, password).then((resp) => {
          _this.handleResponse(resp);
          resolve(true);
      }, (err) => {
        console.log("login failed", err);
        _this.handleResponse(null);
        resolve(false);
      });
    });
  }

  get isLoggedIn(): boolean { return !!this.currentUser; }

  signOut(): void {
    this.handleResponse(null);
  }

  private handleResponse(response: LoginResponse, persist = true) {
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
