import { Test, TestingModule } from '@nestjs/testing';
import { SignsController } from './signs.controller';

describe('Signs Controller', () => {
  let controller: SignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignsController],
    }).compile();

    controller = module.get<SignsController>(SignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
