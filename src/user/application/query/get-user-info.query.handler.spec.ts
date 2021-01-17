import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserRepositoryWrapper } from '@user/infra/persistence/repository/user.repository';

import { GetUserInfoQuery, GetUserInfoQueryResult } from '@user/application/query/get-user-info.query';
import { UserQueryHandler } from '@user/application/query/get-user-info.query.handler';

describe('UserQueryHandler', () => {
  let queryHandler: UserQueryHandler;
  let repository: UserRepositoryWrapper;

  const name = 'Dexter';
  const emailAddress = 'dexter@apop.com';
  const userId = 1;
  const query = new GetUserInfoQuery(userId);

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserQueryHandler,
        {
          provide: 'UserRepositoryWrapper',
          useValue: {
            findById: jest.fn().mockReturnValueOnce({
              name,
              emailAddress
            })
          }
        }
      ]
    }).compile();

    queryHandler = module.get(UserQueryHandler);
    repository = module.get('UserRepositoryWrapper');
  })

  describe('execute', () => {
    it('should get user info', async () => {
      const queryResult: GetUserInfoQueryResult = {
        name,
        emailAddress
      };

      const result = await queryHandler.execute(query);

      expect(result).toEqual(queryResult);

    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findById = jest.fn().mockReturnValueOnce(null);

      await expect(queryHandler.execute(query)).rejects.toThrowError(NotFoundException);
    });
  });
});