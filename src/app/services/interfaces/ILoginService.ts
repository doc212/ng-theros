import { LoginResponse } from 'app/models/DTOs/LoginResponse';
import { Injectable } from '@angular/core';

export abstract class ILoginService {
    abstract login(userId: number, password: string) : Promise<LoginResponse>;
}