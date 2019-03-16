import { ILoginService } from '../interfaces/ILoginService';
import { LoginResponse } from 'app/models/DTOs/LoginResponse';
import { Injectable } from '@angular/core';

@Injectable()
export class FakeLoginService extends ILoginService {
    login(userId: number, password: string): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            if (userId == 1) {
                resolve({
                    token: "some-token",
                    user: {
                        id: 1,
                        fullname: "Some full name",
                        admin: true,
                        password: ""
                    }
                });
            } else {
                reject("bad user id "+userId);
            }
        })
    }

}