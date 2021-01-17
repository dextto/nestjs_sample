import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';
import { User } from '@user/infra/persistence/entity/user.model';

import { FindUserByEmailCommand, FindUserByEmailCommandResult } from '@user/application/command/find-user.command';

@Injectable()
@CommandHandler(FindUserByEmailCommand)
export class FindUserCommandHandler implements ICommandHandler<FindUserByEmailCommand> {
  constructor(private userRepository: UserRepositoryWrapper) { }

  public async execute(command: FindUserByEmailCommand): Promise<FindUserByEmailCommandResult> {
    const { emailAddress } = command;

    const user: User | null = await this.userRepository.findByEmail(emailAddress);
    if (!user) {
      throw new NotFoundException('not found user');
    }

    return {
      userId: user.id,
      name: user.name,
      emailAddress: user.emailAddress,
      password: user.password,
      passwordSalt: user.passwordSalt
    };
  }
}
