import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from 'src/email/email.module';

import { User } from './infra/persistence/entity/user.model';
import { UserRepositoryWrapper } from './infra/persistence/repository/user.repository';
import { GoogleProfile } from '@user/infra/adapter/google/GoogleProfile';

import { CreateUserCommandHandler } from './application/command/create-user.command.handler';
import { CreateGoogleUserCommandHandler } from '@user/application/command/create-google-user.command.handler';
import { UserCreatedEventHandler } from './application/event-handlers/user-created.handler';
import { EmailVerificationCommandHandler } from './application/command/email-verification.command.handler';
import { FindUserCommandHandler } from './application/command/find-user.command.handler';
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
  CreateGoogleUserCommandHandler,
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
