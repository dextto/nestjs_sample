import { Controller, Post, Body, UseGuards, Get, Param, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
import { RolesGuard } from '../roles.guard';
import { Roles, MemberRoles } from '../roles.decorator';

@Controller('teams')
@UseGuards(RolesGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    // TODO: apply ExceptionFiter
    @Post()
    @Roles('admin')
    @HttpCode(201)
    async create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    @Get(':teamId/sign')
    @MemberRoles('read')
    async findTeamSign(@Param('teamId') teamId: number) {
        return await this.teamsService.findTeamSign(teamId);
    }
}
