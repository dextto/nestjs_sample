import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '@email/email.module';

import { User } from '@user/infra/persistence/entity/user.model';
import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { GoogleProfile } from '@user/infra/adapter/google/GoogleProfile';

import { CreateUserCommandHandler } from '@user/application/command/create-user.command.handler';
import { UserCreatedEventHandler } from '@user/application/event-handlers/user-created.handler';
import { EmailVerificationCommandHandler } from '@user/application/command/email-verification.command.handler';
import { FindUserCommandHandler } from '@user/application/command/find-user.command.handler';
import { VerifyGoogleTokenCommandHandler } from '@user/application/command/verify-google-token.command.handler';

import { UserController } from './interface/user.controller';

// infrastructure
const repositories = [UserRepositoryWrapper]
const profiles = [GoogleProfile];

// interface
const controllers = [UserController];

// application
const commandHandlers = [
  CreateUserCommandHandler,
  EmailVerificationCommandHandler,
  FindUserCommandHandler,
  VerifyGoogleTokenCommandHandler,
];
const eventHandlers = [UserCreatedEventHandler];

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
    ...profiles,
  ],
  exports: [TypeOrmModule]
})
export class UserModule { }
