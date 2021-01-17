import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { ResponseMessage } from '@user/constants/message';

import { IGoogleProfile } from '@user/interface/adapter/IGoogleProfile';

import { VerifyGoogleTokenCommand, VerifyGoogleTokenCommandResult } from '@user/application/command/verify-google-token.command';

@CommandHandler(VerifyGoogleTokenCommand)
export class VerifyGoogleTokenCommandHandler {
  constructor(
    @Inject('GoogleProfile') private googleProfile: IGoogleProfile,
  ) { }

  public async execute(command: VerifyGoogleTokenCommand): Promise<VerifyGoogleTokenCommandResult> {
    const { accessToken } = command;

    const profile = await this.googleProfile.getProfile(accessToken);

    return (profile.email !== null && profile.name !== null) ?
      { result: ResponseMessage.VERIFIED }
      : { result: ResponseMessage.NOT_VERIFIED }
  }
}
