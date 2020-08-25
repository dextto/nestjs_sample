import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand, CreateUserCommandResult } from '../application/command/create-user.command';
import { EmailVerificationCommand } from '../application/command/email-verification.command';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthorizationCommand as AuthorizationCommand, AuthorizationCommandResult } from '../../auth/command/authorization.command';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private commandBus: CommandBus) { }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    const { userId, emailAddress } = req.user;
    const command = new AuthorizationCommand(userId, emailAddress);
    return await this.commandBus.execute(command);
  }

  @Post()
  public async createUser(@Body() dto: CreateUserDto): Promise<CreateUserCommandResult> {
    const { name, email, password } = dto;
    const command = new CreateUserCommand(name, email, password);
    return this.commandBus.execute(command);
  }

  @Get('/email-verification')
  public async emailVerification(@Query('authToken') authToken: string) {
    const command = new EmailVerificationCommand(authToken)
    return await this.commandBus.execute(command);
  }
}
