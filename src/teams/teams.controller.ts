import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
import { RolesGuard } from 'src/roles.guard';
import { Roles, MemberRoles } from 'src/roles.decorator';

@Controller('teams')
@UseGuards(RolesGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @Roles('admin')
    async create(@Body() createTeamDto: CreateTeamDto) {
        this.teamsService.create(createTeamDto);
    }

    @Get(':teamId/sign')
    @MemberRoles('read')
    async findTeamSign(@Param('teamId') teamId: number) {
        return await this.teamsService.findTeamSign(teamId);
    }
}
