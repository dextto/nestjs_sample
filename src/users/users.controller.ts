import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../roles.decorator';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  // TODO: apply ExceptionFiter
  @Post()
  @Roles('admin')
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(payload);
  }
}
