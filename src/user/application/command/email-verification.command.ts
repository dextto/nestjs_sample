import { ICommand } from "@nestjs/cqrs";

export class EmailVerificationCommand implements ICommand {
  constructor(
    public readonly authToken: string,
  ) { }
}

export interface EmailVerificationCommandResult {
  userId: number;
}