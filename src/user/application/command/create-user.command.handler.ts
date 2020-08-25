import * as uuid from 'uuid';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';

import { EncodingType, EncryptionType } from 'src/constants';
import { UserCreated } from 'src/user/domain/event/UserCreated';
import { AuthToken } from 'src/user/domain/AuthToken';
import { User } from 'src/user/domain/user.model';
import { CreateUserCommand, CreateUserCommandResult } from './create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private eventBus: EventBus,
  ) { }

  public async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const { name, emailAddress, password } = command;

    await this.checkUserExists(emailAddress);

    const salt = 'test'; // crypto.randomBytes(16).toString(EncodingType.BASE_64); // TODO
    const hashedPassword = crypto
      .pbkdf2Sync(
        password,
        Buffer.from(salt, EncodingType.BASE_64),
        10000,
        64,
        EncryptionType.SHA_512,
      )
      .toString(EncodingType.BASE_64);

    const expiryTime = moment()
      .add(30, 'days')
      .toDate();
    const authToken = new AuthToken(uuid.v1(), expiryTime);

    const user = new User();
    user.name = name;
    user.emailAddress = emailAddress;
    user.password = password;
    user.emailAuthToken = authToken.token;
    user.emailAuthTokenExpiryTime = expiryTime;
    await user.save();

    this.eventBus.publish(new UserCreated(user.id, emailAddress, authToken.token));

    return { userId: user.id };
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  private async checkUserExists(emailAddress: string) {
    const user = await this.userModel.findOne({ where: { emailAddress } });
    if (user) {
      throw new UnprocessableEntityException('user already exists');
    }
  }
}
