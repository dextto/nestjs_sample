import { IsInt, IsUrl, IsString } from 'class-validator';

export class CreateSignDto {
    @IsString() // TODO: @IsUrl()
    url: string;
}

export class UpdateSignDto {
    @IsString()  // TODO: @IsUrl()
    url: string;
}
