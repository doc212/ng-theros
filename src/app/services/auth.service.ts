import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  signIn(username: string, password: string): Promise<boolean> {
    return Promise.resolve(username == "foo" && password == "bar");
  }

}
