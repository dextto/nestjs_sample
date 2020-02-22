import { IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
    @ApiProperty()
    @IsInt()
    userId: number;

    @ApiProperty()
    @IsInt()
    teamId: number;

    @ApiProperty()
    @IsBoolean()
    can_read_teamsign: boolean;

    @ApiProperty()
    @IsBoolean()
    can_update_teamsign: boolean;

    @ApiProperty()
    @IsBoolean()
    can_delete_teamsign: boolean;
}