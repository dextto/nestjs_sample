import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { CreateTeamMemberDto } from './dto/team-member.dto';

@Controller('team_members')
@UseGuards(RolesGuard)
export class TeamMembersController {
    constructor(private readonly teamMembersService: TeamMembersService) {}

    @Post()
    @Roles('admin')
    async create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
        this.teamMembersService.create(createTeamMemberDto);
    }
}
