import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';

import { EmailVerificationCommand, EmailVerificationCommandResult } from '@user/application/command/email-verification.command';

// TODO: transaction
@CommandHandler(EmailVerificationCommand)
export class EmailVerificationCommandHandler implements ICommandHandler<EmailVerificationCommand> {
  constructor(
    private userRepository: UserRepositoryWrapper,
  ) { }

  public async execute(command: EmailVerificationCommand): Promise<EmailVerificationCommandResult> {
    const { authToken } = command;

    const user = await this.userRepository.findByEmailAuthToken(authToken);
    if (user === null) {
      throw new NotFoundException('User not found.');
    }

    const expiryTime = user.emailAuthTokenExpiryTime;
    if (expiryTime === null) {
      throw new UnprocessableEntityException('email user is already authenticated');
    }
    if (new Date() > expiryTime) {
      throw new UnprocessableEntityException('email auth token is expired');
    }

    await this.userRepository.updateEmailAuthTokenExpiryTime(user.id, null);

    return {
      userId: user.id
    }
  }
}
