import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/roles.decorator';


@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  @Roles('admin')
  async createUser(@Payload() payload: CreateUserDto) {
    return await this.usersService.createUser(payload);
  }
}
