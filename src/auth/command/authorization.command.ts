import { ICommand } from "@nestjs/cqrs";

export class AuthorizationCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly emailAddress: string,
  ) { }
}

export interface AuthorizationCommandResult {
  accessToken: string;
}