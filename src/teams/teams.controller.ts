import { Controller, Post, Param, Body } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    async create(
        @Body() createTeamDto: CreateTeamDto
    ) {
        this.teamsService.create(createTeamDto);
    }
    
}
