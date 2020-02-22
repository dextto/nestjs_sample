import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
    @ApiProperty()
    @IsInt()
    signId: number;
}