import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { IEmailSender } from '@user/application/adapter/IEmailSender';

import { UserCreated } from "@user/domain/event/UserCreated";

@EventsHandler(UserCreated)
export class UserCreatedEventHandler implements IEventHandler<UserCreated> {
  constructor(@Inject('EmailSender') private readonly emailSender: IEmailSender) { }

  async handle(event: UserCreated) {
    const { emailAddress, authToken } = event;

    await this.emailSender.sendVerification(emailAddress, authToken);
  }
}