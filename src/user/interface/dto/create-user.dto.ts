import { IsString, IsEmail, MaxLength, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 32)
  public readonly name: string;

  @IsEmail()
  @Length(2, 64)
  public readonly email: string;

  @IsString()
  @MaxLength(64)
  public readonly password: string;
}