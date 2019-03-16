import { ILoginService } from '../interfaces/ILoginService';
import { LoginResponse } from 'app/models/DTOs/LoginResponse';
import { Injectable } from '@angular/core';
import { MockData } from './MockData';

@Injectable()
export class FakeLoginService implements ILoginService {
    login(userId: number, password: string): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            if (userId == 1 || userId == 2) {
                resolve({
                    token: "some-token",
                    user: MockData.users[userId - 1],
                });
            } else {
                reject("bad user id " + userId);
            }
        })
    }

}