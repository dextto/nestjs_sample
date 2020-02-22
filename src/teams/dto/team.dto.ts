import { IsInt } from 'class-validator';

export class CreateTeamDto {
    @IsInt()
    signId: number;
}