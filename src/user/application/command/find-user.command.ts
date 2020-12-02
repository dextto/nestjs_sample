import { ICommand } from "@nestjs/cqrs";

export class FindUserByEmailCommand implements ICommand {
  constructor(public readonly emailAddress: string) { }
}

export interface FindUserByEmailCommandResult {
  userId: number;
  name: string;
  emailAddress: string;
  password: string;
  passwordSalt: string;
}