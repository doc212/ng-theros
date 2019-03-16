import { LoginResponse } from 'app/models/DTOs/LoginResponse';

export abstract class ILoginService {
    abstract login(userId: number, password: string) : Promise<LoginResponse>;
}