import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './team-member.entity';
import { Repository } from 'typeorm';
import { CreateTeamMemberDto } from './dto/team-member.dto';
import { Team } from '../teams/team.entity';
import { User } from '../users/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class TeamMembersService {
    constructor(
        @InjectRepository(TeamMember)
        private readonly teamRepository: Repository<TeamMember>
    ) { }

    async create(createTeamMemberDto: CreateTeamMemberDto) {
        const user = await User.findOne(createTeamMemberDto.userId);
        const team = await Team.findOne(createTeamMemberDto.teamId);
        const teamMember = new TeamMember();
        teamMember.user = user;
        teamMember.team = team;
        teamMember.can_read_teamsign = createTeamMemberDto.can_read_teamsign
        teamMember.can_update_teamsign = createTeamMemberDto.can_update_teamsign
        teamMember.can_delete_teamsign = createTeamMemberDto.can_delete_teamsign

        const errors = await validate(teamMember);
        if (errors.length > 0) {
            const errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        } else {
            return await TeamMember.save(teamMember);
        }
    }
}
