import { Test, TestingModule } from '@nestjs/testing';
import { TeamMembersController } from '../src/team-members/team-members.controller';

describe('TeamMembers Controller', () => {
  let controller: TeamMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMembersController],
    }).compile();

    controller = module.get<TeamMembersController>(TeamMembersController);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
});
