import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from 'src/email/email.module';

import { User } from './infra/persistence/entity/user.model';
import { UserRepositoryWrapper } from './infra/persistence/repository/user.repository';

import { CreateUserCommandHandler } from './application/command/create-user.command.handler';
import { UserCreatedHandler } from './application/event-handlers/user-created.handler';
import { EmailVerificationCommandHandler } from './application/command/email-verification.command.handler';
import { FindUserCommandHandler } from './application/command/find-user.command.handler';

import { UserController } from './interface/user.controller';

// infrastructure
const repositories = [UserRepositoryWrapper]

// application
const commandHandlers = [
  CreateUserCommandHandler,
  EmailVerificationCommandHandler,
  FindUserCommandHandler
];
const eventHandlers = [UserCreatedHandler];

// interface
const controllers = [UserController];

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    EmailModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers,
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...repositories,
  ],
  exports: [TypeOrmModule]
})
export class UserModule { }
