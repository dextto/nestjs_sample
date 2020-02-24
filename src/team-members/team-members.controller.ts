import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import { CreateTeamMemberDto } from './dto/team-member.dto';

@Controller('team_members')
@UseGuards(RolesGuard)
export class TeamMembersController {
    constructor(private readonly teamMembersService: TeamMembersService) { }

    @Post()
    @Roles('admin')
    @HttpCode(201)
    async create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
        this.teamMembersService.create(createTeamMemberDto);
    }
}
