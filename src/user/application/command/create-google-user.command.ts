import { ICommand } from "@nestjs/cqrs";

export class CreateGoogleUserCommand implements ICommand {
  constructor(
    public readonly user: any, // TODO
  ) { }
}

export interface CreateGoogleUserCommandResult {
  // userId: number;
  user: any;
}
