import { ICommand } from "@nestjs/cqrs";

export class AuthorizationCommand implements ICommand {
  constructor(
    public readonly emailAddress: string,
    public readonly password: string,
  ) { }
}

export interface AuthorizationCommandResult {
  accessToken: string;
}