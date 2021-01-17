import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { EmailSender } from "@email/EmailSender";

import { UserCreated } from "@user/domain/event/UserCreated";

@EventsHandler(UserCreated)
export class UserCreatedEventHandler implements IEventHandler<UserCreated> {
  constructor(private readonly emailSender: EmailSender) { }

  async handle(event: UserCreated) {
    const { emailAddress, authToken } = event;

    await this.emailSender.sendVerification(emailAddress, authToken);
  }
}