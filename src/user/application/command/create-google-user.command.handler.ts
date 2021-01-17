import * as uuid from 'uuid';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { NotAcceptableException, UnprocessableEntityException } from '@nestjs/common';

import { EncodingType, EncryptionType } from '@constants/types';

import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { User } from '@user/infra/persistence/entity/user.model';

import { CreateGoogleUserCommand, CreateGoogleUserCommandResult } from '@user/application/command/create-google-user.command';

import { UserCreated } from '@user/domain/event/UserCreated';
import { AuthToken } from '@user/domain/AuthToken';

@CommandHandler(CreateGoogleUserCommand)
export class CreateGoogleUserCommandHandler {
  constructor(
    private eventBus: EventBus,
    private userRepository: UserRepositoryWrapper,
  ) { }

  public async execute(command: CreateGoogleUserCommand): Promise<CreateGoogleUserCommandResult> {
    const { user } = command;

    if (!user) {
      throw new NotAcceptableException('not google user'); // TODO;
    }

    // await this.checkUserExists(emailAddress);

    // const salt = crypto.randomBytes(16).toString(EncodingType.BASE_64);
    // const hashedPassword = crypto
    //   .pbkdf2Sync(
    //     password,
    //     Buffer.from(salt, EncodingType.BASE_64),
    //     10000,
    //     64,
    //     EncryptionType.SHA_512,
    //   )
    //   .toString(EncodingType.BASE_64);

    // const expiryTime = dayjs()
    //   .add(30, 'day')
    //   .toDate();
    // const authToken = new AuthToken(uuid.v1(), expiryTime);

    // const user: User = await this.userRepository.createUser(
    //   name,
    //   emailAddress,
    //   hashedPassword,
    //   salt,
    //   authToken.token,
    //   expiryTime
    // )

    // this.eventBus.publish(new UserCreated(user.id, emailAddress, authToken.token));

    // return { userId: user.id };
    return user;
  }

  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findByEmail(emailAddress);
    if (user !== null) {
      throw new UnprocessableEntityException('user already exists');
    }
  }
}