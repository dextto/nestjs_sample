import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/team.dto';
import { Sign } from '../signs/sign.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) { }

    async create(createTeamDto: CreateTeamDto) {
        const sign = await Sign.findOne(createTeamDto.signId);
        let errors = `Sign is not found with signId ${createTeamDto.signId}`;
        if (!sign) throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY);

        const team = new Team();
        team.sign = sign;
        return await this.teamRepository.save(team);
    }

    async findTeamSign(teamId: number): Promise<Sign> {
        const team = await Team.findOne(teamId);
        let errors = `Team is not found with teamId ${teamId}`;
        if (!team) throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY);

        return await Sign.findOne(team.signId);
    }
}
