import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private readonly connection: Connection) {}
}
