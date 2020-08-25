import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';

import { EmailModule } from 'src/email/email.module';
import { UserController } from './interface/user.controller';
import { CreateUserCommandHandler } from './application/command/create-user.command.handler';
import { UserCreatedHandler } from './application/event-handlers/user-created.handler';
import { EmailVerificationCommandHandler } from './application/command/email-verification.command.handler';
import { FindUserCommandHandler } from './application/command/find-user.command.handler';
import { User } from './domain/user.model';

const controllers = [UserController];
const commandHandlers = [
  CreateUserCommandHandler,
  EmailVerificationCommandHandler,
  FindUserCommandHandler];
const eventHandlers = [UserCreatedHandler];

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    SequelizeModule.forFeature([User]),
    EmailModule,
  ],
  controllers,
  providers: [
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class UserModule { }
