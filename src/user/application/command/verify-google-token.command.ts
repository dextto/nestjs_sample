import { ICommand } from "@nestjs/cqrs";

export class VerifyGoogleTokenCommand implements ICommand {
  constructor(
    public readonly accessToken: string
  ) { }
}

export interface VerifyGoogleTokenCommandResult {
  result: string;
}
