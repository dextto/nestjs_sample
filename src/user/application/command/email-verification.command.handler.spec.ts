import * as dayjs from 'dayjs';
import { clear, advanceTo } from 'jest-date-mock';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { EmailVerificationCommand, EmailVerificationCommandResult } from './email-verification.command';
import { EmailVerificationCommandHandler } from './email-verification.command.handler';


describe('EmailVerificationCommand', () => {
  let commandHandler: EmailVerificationCommandHandler;
  let repository: UserRepositoryWrapper;

  const authToken = 'auth-token';
  const userId = 1;
  const command = new EmailVerificationCommand(authToken);

  beforeAll(async () => {
    advanceTo(new Date('2000-01-01 00:00:00'));

    const module = await Test.createTestingModule({
      providers: [
        EmailVerificationCommandHandler,
        {
          provide: 'UserRepositoryWrapper',
          useValue: {
            updateEmailAuthTokenExpiryTime: jest.fn(),
            findByEmailAuthToken: jest.fn().mockReturnValue({
              id: userId,
              emailAuthTokenExpiryTime: new Date(),
            }),
          }
        }
      ]
    }).compile();

    commandHandler = module.get(EmailVerificationCommandHandler);
    repository = module.get('UserRepositoryWrapper');
  });

  afterAll(() => {
    clear();
  });

  describe('execute', () => {
    it('should authenticate', async () => {
      const commandResult: EmailVerificationCommandResult = {
        userId
      };

      const result = await commandHandler.execute(command);

      expect(result).toEqual(commandResult);

    });

    it('should throw NotFoundException when user exists', async () => {
      repository.findByEmailAuthToken = jest.fn().mockReturnValueOnce(null);

      await expect(commandHandler.execute(command)).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnprocessableEntityException when user is already authenticated', async () => {
      repository.findByEmailAuthToken = jest.fn().mockReturnValueOnce({
        id: userId,
        emailAuthTokenExpiryTime: null,
      });

      await expect(commandHandler.execute(command)).rejects.toThrowError(UnprocessableEntityException);
    });

    it('should throw UnprocessableEntityException when auth token is expired', async () => {
      repository.findByEmailAuthToken = jest.fn().mockReturnValueOnce({
        id: userId,
        emailAuthTokenExpiryTime: dayjs().subtract(1, 'day'),
      });

      await expect(commandHandler.execute(command)).rejects.toThrowError(UnprocessableEntityException);
    });
  });
});