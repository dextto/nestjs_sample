import { ICommand } from "@nestjs/cqrs";

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly emailAddress: string,
    public readonly password: string,
  ) { }
}

export interface CreateUserCommandResult {
  userId: number;
}