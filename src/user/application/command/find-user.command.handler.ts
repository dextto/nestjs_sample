import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';

import { User } from 'src/user/domain/user.model';
import { FindUserCommand, FindUserCommandResult } from './find-user.command';

@Injectable()
@CommandHandler(FindUserCommand)
export class FindUserCommandHandler implements ICommandHandler<FindUserCommand> {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) { }

  public async execute(command: FindUserCommand): Promise<FindUserCommandResult> {
    const { emailAddress, password } = command;

    const user: User = await this.userModel.findOne({ where: { emailAddress, password } });
    if (!user) {
      throw new NotFoundException('not found user');
    }

    return {
      name: user.name,
      userId: user.id,
      emailAddress: user.emailAddress
    };
  }
}
