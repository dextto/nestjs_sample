import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(payload: CreateUserDto) {
        const user: User = new User();
        user.name = payload.name;
        user.role = payload.role;
        return await User.save(user);
    }
}
