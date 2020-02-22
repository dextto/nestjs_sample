import { IsUrl, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSignDto {
    @ApiProperty()
    @IsString() // TODO: @IsUrl()
    url: string;
}

export class UpdateSignDto {
    @ApiProperty()
    @IsString()  // TODO: @IsUrl()
    url: string;
}
