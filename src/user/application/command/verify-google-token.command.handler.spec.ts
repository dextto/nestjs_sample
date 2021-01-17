import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { IGoogleProfile } from '@user/interface/adapter/IGoogleProfile';

import { VerifyGoogleTokenCommandResult } from '@user/application/command/verify-google-token.command';
import { VerifyGoogleTokenCommandHandler } from '@user/application/command/verify-google-token.command.handler';

import { Profile } from '@user/domain/user/Profile';
import { Email } from '@user/domain/user/Email';
import { ResponseMessage } from '@user/constants/message';

describe('VerifyGoogleTokenCommandHandler', () => {
  let commandHandler: VerifyGoogleTokenCommandHandler;
  let googleProfile: IGoogleProfile;

  const email = new Email('dexter@test.com');
  const profile = new Profile('Dexter', email, 'picture');

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VerifyGoogleTokenCommandHandler,
        {
          provide: 'GoogleProfile',
          useValue: {
            getProfile: jest.fn().mockReturnValue(profile),
          }
        },
      ]
    }).compile();

    commandHandler = module.get(VerifyGoogleTokenCommandHandler);
    googleProfile = module.get('GoogleProfile');
  });

  describe('execute', () => {
    it('should be verified when google profile is valid', async () => {
      const commandResult: VerifyGoogleTokenCommandResult = {
        result: ResponseMessage.VERIFIED
      };

      const result = await commandHandler.execute({ accessToken: 'RIGHT TOKEN' });

      expect(result).toEqual(commandResult);
    });

    it('should be not verified when google profile is not valid', async () => {
      const commandResult: VerifyGoogleTokenCommandResult = {
        result: ResponseMessage.NOT_VERIFIED
      };

      googleProfile.getProfile = jest.fn().mockReturnValueOnce(new Profile(null, email, 'picture'));
      let result = await commandHandler.execute({ accessToken: 'WRONG TOKEN' });
      expect(result).toEqual(commandResult);

      googleProfile.getProfile = jest.fn().mockReturnValueOnce(new Profile('Dexter', null, 'picture'));
      result = await commandHandler.execute({ accessToken: 'WRONG TOKEN' });
      expect(result).toEqual(commandResult);
    });
  });
});