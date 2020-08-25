import { ICommand } from "@nestjs/cqrs";

export class FindUserCommand implements ICommand {
  constructor(
    public readonly emailAddress: string,
    public readonly password: string,
  ) { }
}

export interface FindUserCommandResult {
  name: string;
  userId: string;
  emailAddress: string;
}