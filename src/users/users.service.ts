import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(private readonly connection: Connection) {}
}
