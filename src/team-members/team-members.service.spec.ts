import { Test, TestingModule } from '@nestjs/testing';
import { TeamMembersService } from './team-members.service';

describe('TeamMembersService', () => {
  let service: TeamMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMembersService],
    }).compile();

    service = module.get<TeamMembersService>(TeamMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
