import * as crypto from 'crypto';
import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';

import { EncodingType, EncryptionType } from '@constants/types';

import { FindUserByEmailCommand, FindUserByEmailCommandResult } from '@user/application/command/find-user.command';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandBus: CommandBus) {
    super({ usernameField: 'emailAddress' });
  }

  async validate(emailAddress: string, password: string): Promise<any> {
    const command = new FindUserByEmailCommand(emailAddress);
    const result: FindUserByEmailCommandResult = await this.commandBus.execute(command);
    const hashedPassword = crypto
      .pbkdf2Sync(
        password,
        Buffer.from(result.passwordSalt, EncodingType.BASE_64),
        10000,
        64,
        EncryptionType.SHA_512,
      )
      .toString(EncodingType.BASE_64);

    if (result.password !== hashedPassword) {
      throw new UnauthorizedException('wrong password');
    }

    return {
      userId: result.userId,
      emailAddress: result.emailAddress
    };
  }
}
