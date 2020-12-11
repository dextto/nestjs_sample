import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';

import { CreateUserCommand, CreateUserCommandResult } from '../application/command/create-user.command';
import { EmailVerificationCommand, EmailVerificationCommandResult } from '../application/command/email-verification.command';
import { AuthorizationCommand as AuthorizationCommand } from '../../auth/command/authorization.command';
import { GetUserInfoQuery, GetUserInfoQueryResult } from '@user/application/query/get-user-info.query';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req: any) {
    const { emailAddress, password } = req.user;
    const command = new AuthorizationCommand(emailAddress, password);
    return await this.commandBus.execute(command);
  }

  @Post()
  public async createUser(@Body() dto: CreateUserDto): Promise<CreateUserCommandResult> {
    const { name, email, password } = dto;
    const command = new CreateUserCommand(name, email, password);
    return this.commandBus.execute(command);
  }

  @Get('/email-verification')
  public async emailVerification(@Query('authToken') authToken: string): Promise<EmailVerificationCommandResult> {
    const command = new EmailVerificationCommand(authToken)
    return await this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public getUserInfo(@Request() req: any): Promise<GetUserInfoQueryResult> {
    const userId = req.user.userId;
    const query = new GetUserInfoQuery(userId);
    return this.queryBus.execute(query);
  }
}
