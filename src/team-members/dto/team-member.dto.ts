import { IsInt, IsBoolean } from 'class-validator';

export class CreateTeamMemberDto {
    @IsInt()
    userId: number;

    @IsInt()
    teamId: number;

    @IsBoolean()
    can_read_teamsign: boolean;

    @IsBoolean()
    can_update_teamsign: boolean;

    @IsBoolean()
    can_delete_teamsign: boolean;
}