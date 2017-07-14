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
}
