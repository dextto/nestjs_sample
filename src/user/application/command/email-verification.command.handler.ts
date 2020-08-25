import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EmailVerificationCommand } from './email-verification.command';
import { User } from 'src/user/domain/user.model';

@Injectable()
@CommandHandler(EmailVerificationCommand)
export class EmailVerificationCommandHandler implements ICommandHandler<EmailVerificationCommand> {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) { }

  public async execute(command: EmailVerificationCommand): Promise<number> {
    const { authToken } = command;

    const user = await this.findUser(authToken);

    const expiryTime = user.emailAuthTokenExpiryTime;
    if (expiryTime === null) {
      throw new UnprocessableEntityException('email user is already authenticated');
    }
    if (new Date() > expiryTime) {
      throw new UnprocessableEntityException('email auth token is expired');
    }

    user.emailAuthTokenExpiryTime = null;
    await user.save();

    return user.id;
  }

  private async findUser(emailAuthToken: string) {
    const user = await this.userModel.findOne({ where: { emailAuthToken } })
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
