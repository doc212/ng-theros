import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';

@Injectable()
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  getUsers(): Promise<User[]> {
    return this.api.get("/login").then((resp) => resp.json() as User[]);
  }

  getUser(id: number): Promise<User> {
    return Promise.resolve({
      id: id,
      fullname: "Some user"
    });
    // return this.api.get("/user/" + id).then(resp => resp.json() as User);
  }

  resetPassword(password: string, id: number) {
    console.log("new password: %s for user %s", password, id);
    this.api.put("/user",{
      id:id, password:password
    });
  }
}
