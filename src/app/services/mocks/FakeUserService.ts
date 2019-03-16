import { IUserService } from '../interfaces/IUserService';
import { User } from 'app/models/user';
import { MockData } from './MockData';

export class FakeUserService implements IUserService {
    getUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve(MockData.users);
        });
    }
}