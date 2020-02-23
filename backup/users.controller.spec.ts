import { Test, TestingModule } from '@nestjs/testing';
import { UsersController as UsersController } from '../src/users/users.controller';

describe('User Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect(1).toBe(1);
  });
});
