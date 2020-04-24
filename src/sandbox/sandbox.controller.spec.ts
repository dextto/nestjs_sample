import { Test, TestingModule } from '@nestjs/testing';
import { SandboxController } from './sandbox.controller';

describe('Sandbox Controller', () => {
  let controller: SandboxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SandboxController],
    }).compile();

    controller = module.get<SandboxController>(SandboxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
