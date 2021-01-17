import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  public readonly accessToken: string;
}
