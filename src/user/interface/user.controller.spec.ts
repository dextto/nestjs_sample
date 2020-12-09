import { AuthorizationCommand, AuthorizationCommandResult } from '@auth/command/authorization.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';

import { CreateUserCommand, CreateUserCommandResult } from '../application/command/create-user.command';
import { EmailVerificationCommand } from '../application/command/email-verification.command';
import { GetUserInfoQuery, GetUserInfoQueryResult } from '../application/query/get-user-info.query';

describe('UserController', () => {
  let controller: UserController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const name = 'name';
  const email = 'test@test.com';
  const password = 'password';
  const userId = 1;
  const authToken = 'auth-token';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'CommandBus',
          useValue: {},
        },
        {
          provide: 'QueryBus',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    commandBus = module.get('CommandBus');
    queryBus = module.get('QueryBus');

  });

  describe('createUser', () => {
    it('should call command bus', async () => {
      const commandResult: CreateUserCommandResult = {
        userId: 1
      }
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.createUser({ name, email, password });

      expect(commandBus.execute).toBeCalledWith(new CreateUserCommand(name, email, password));
      expect(result).toEqual(commandResult);
    });
  });

  describe('login', () => {
    it('should call command bus', async () => {
      const commandResult: AuthorizationCommandResult = {
        accessToken: 'access-token'
      }
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.login({
        user: {
          emailAddress: email,
          password
        }
      });

      expect(commandBus.execute).toBeCalledWith(new AuthorizationCommand(email, password));
      // expect(result).toEqual(commandResult);
    });
  });

  describe('emailVerification', () => {
    it('should call command bus', async () => {
      const commandResult: number = userId;
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.emailVerification(authToken);

      expect(commandBus.execute).toBeCalledWith(new EmailVerificationCommand(authToken));
      expect(result).toEqual(commandResult);
    });
  });

  describe('getUserInfo', () => {
    it('should call command bus', async () => {
      const queryResult: GetUserInfoQueryResult = {
        name,
        emailAddress: email
      };
      queryBus.execute = jest.fn().mockReturnValueOnce(queryResult);

      const result = await controller.getUserInfo({
        user: {
          userId
        }
      });

      expect(queryBus.execute).toBeCalledWith(new GetUserInfoQuery(userId));
      expect(result).toEqual(queryResult);
    });
  });
});
