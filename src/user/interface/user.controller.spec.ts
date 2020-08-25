import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CommandBus } from '@nestjs/cqrs';

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CommandBus],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(1).toEqual(1);
    });
  });
});
