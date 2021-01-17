import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';

import { FindUserByEmailCommand, FindUserByEmailCommandResult } from '@user/application/command/find-user.command';
import { FindUserCommandHandler } from '@user/application/command/find-user.command.handler';

describe('FindUserByEmailCommand', () => {
  let commandHandler: FindUserCommandHandler;
  let repository: UserRepositoryWrapper;

  const userId = 1;
  const name = 'dexter';
  const password = 'password';
  const passwordSalt = 'password-salt';
  const emailAddress = 'dexter@apop.com';
  const command = new FindUserByEmailCommand(emailAddress);

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FindUserCommandHandler,
        {
          provide: 'UserRepositoryWrapper',
          useValue: {
            findByEmail: jest.fn().mockReturnValue({
              id: userId,
              name,
              emailAddress,
              password,
              passwordSalt
            }),
          }
        }
      ]
    }).compile();

    commandHandler = module.get(FindUserCommandHandler);
    repository = module.get('UserRepositoryWrapper');
  });

  describe('execute', () => {
    it('should find user', async () => {
      const commandResult: FindUserByEmailCommandResult = {
        userId,
        name,
        emailAddress,
        password,
        passwordSalt
      };

      const result = await commandHandler.execute(command);

      expect(result).toEqual(commandResult);

    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByEmail = jest.fn().mockReturnValueOnce(null);

      await expect(commandHandler.execute(command)).rejects.toThrowError(NotFoundException);
    });
  });
});