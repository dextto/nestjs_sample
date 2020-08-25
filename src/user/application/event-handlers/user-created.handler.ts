import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreated } from "src/user/domain/event/UserCreated";
import { EmailSender } from "src/email/EmailSender";

@EventsHandler(UserCreated)
export class UserCreatedHandler implements IEventHandler<UserCreated> {
  constructor(private readonly emailSender: EmailSender) { }

  handle(event: UserCreated) {
    console.log('UserCreatedHandler!!!')
    const { emailAddress, authToken } = event;

    this.emailSender.sendVerification(emailAddress, authToken);
  }
}