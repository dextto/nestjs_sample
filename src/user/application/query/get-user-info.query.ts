import { IQuery } from '@nestjs/cqrs';

export class GetUserInfoQuery implements IQuery {
  constructor(public readonly userId: number) { }
}

export interface GetUserInfoQueryResult {
  name: string;
  emailAddress: string;
}