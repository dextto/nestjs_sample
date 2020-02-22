import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/team.dto';
import { Sign } from 'src/signs/sign.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) {}

    async create(createTeamDto: CreateTeamDto) {
        const sign = await Sign.findOne(createTeamDto.signId);
        const team = new Team();
        team.sign = sign;
        return await this.teamRepository.save(team);
    }
}
