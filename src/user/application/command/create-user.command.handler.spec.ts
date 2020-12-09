import { UnprocessableEntityException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { CreateUserCommandResult } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command.handler';

describe('CreateUserCommandHandler', () => {
  let commandHandler: CreateUserCommandHandler;
  let eventBus: EventBus;
  let repository: UserRepositoryWrapper;

  const name = 'Dexter';
  const emailAddress = 'dexter@apop.com';
  const password = 'password';
  const userId = 1;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserCommandHandler,
        {
          provide: 'EventBus',
          useValue: {
            publish: jest.fn(),
          }
        },
        {
          provide: 'UserRepositoryWrapper',
          useValue: {
          }
        }
      ]
    }).compile();

    commandHandler = module.get(CreateUserCommandHandler);
    eventBus = module.get('EventBus');
    repository = module.get('UserRepositoryWrapper');
  })

  describe('execute', () => {
    it('should create user when user does not exist', async () => {
      repository.findByEmail = jest.fn().mockReturnValueOnce(null);
      repository.createUser = jest.fn().mockReturnValueOnce({
        id: userId
      });

      const commandResult: CreateUserCommandResult = {
        userId
      };

      const result = await commandHandler.execute({ name, emailAddress, password });

      expect(result).toEqual(commandResult);

    });

    it('should throw UnprocessableEntityException when user exists', async () => {
      repository.findByEmail = jest.fn().mockReturnValueOnce({ id: 1 });

      await expect(commandHandler.execute({ name, emailAddress, password })).rejects.toThrowError(UnprocessableEntityException);
    });
  });
});