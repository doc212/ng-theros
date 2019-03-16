import { User } from 'app/models/user';

export abstract class IUserService {
  abstract getUsers(): Promise<User[]>;
}