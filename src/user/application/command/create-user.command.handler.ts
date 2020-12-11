import * as uuid from 'uuid';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { EncodingType, EncryptionType } from '@constants/types';
import { UserCreated } from '@user/domain/event/UserCreated';
import { AuthToken } from '@user/domain/AuthToken';
import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { CreateUserCommand, CreateUserCommandResult } from './create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private eventBus: EventBus,
    private userRepository: UserRepositoryWrapper,
  ) { }

  public async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const { name, emailAddress, password } = command;

    await this.checkUserExists(emailAddress);

    const salt = crypto.randomBytes(16).toString(EncodingType.BASE_64);
    const hashedPassword = crypto
      .pbkdf2Sync(
        password,
        Buffer.from(salt, EncodingType.BASE_64),
        10000,
        64,
        EncryptionType.SHA_512,
      )
      .toString(EncodingType.BASE_64);

    const expiryTime = dayjs()
      .add(30, 'day')
      .toDate();
    const authToken = new AuthToken(uuid.v1(), expiryTime);

    const user = await this.userRepository.createUser(
      name,
      emailAddress,
      hashedPassword,
      salt,
      authToken.token,
      expiryTime
    )

    this.eventBus.publish(new UserCreated(user.id, emailAddress, authToken.token));

    return { userId: user.id };
  }

  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findByEmail(emailAddress);
    if (user) {
      throw new UnprocessableEntityException('user already exists');
    }
  }
}
