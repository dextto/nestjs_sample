import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from '../src/teams/teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
});
