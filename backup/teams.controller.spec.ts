import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from '../src/teams/teams.controller';

describe('Teams Controller', () => {
  let controller: TeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
});
