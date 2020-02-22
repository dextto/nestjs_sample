import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('teams')
@UseGuards(RolesGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @Roles('admin')
    async create(@Body() createTeamDto: CreateTeamDto) {
        this.teamsService.create(createTeamDto);
    }

}
