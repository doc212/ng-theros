import { IUserService } from '../interfaces/IUserService';
import { User } from 'app/models/user';

export class FakeUserService implements IUserService {
    getUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve([
                {
                    id: 1,
                    fullname: "John Doe",
                    admin: true,
                    password: "",
                },
                {
                    id: 2,
                    fullname: "Some shmoe",
                    admin: false,
                    password: "",
                }
            ]);
        });
    }
}