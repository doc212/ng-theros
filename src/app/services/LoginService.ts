import { ILoginService } from './interfaces/ILoginService';
import { ApiService } from './api.service';
import { LoginResponse } from 'app/models/DTOs/LoginResponse';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService extends ILoginService {
    constructor(
        private _api: ApiService
    ) {
        super();
    }

    login(userId: number, password: string): Promise<LoginResponse> {
        return this._api.post("/login", {
            id: userId,
            password: password
        });
    }
}