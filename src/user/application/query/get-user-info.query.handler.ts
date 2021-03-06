import { NotFoundException } from "@nestjs/common";
import { QueryHandler } from "@nestjs/cqrs";

import { UserRepositoryWrapper } from "@user/infra/persistence/repository/user.repository";

import { GetUserInfoQuery, GetUserInfoQueryResult } from "@user/application/query/get-user-info.query";

@QueryHandler(GetUserInfoQuery)
export class UserQueryHandler {
  constructor(
    private readonly userRepository: UserRepositoryWrapper,
  ) { }

  public async execute(query: GetUserInfoQuery): Promise<GetUserInfoQueryResult> {
    const { userId } = query;
    const user = await this.userRepository.findById(userId);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return {
      name: user.name,
      emailAddress: user.emailAddress
    }
  }
}