import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  // TODO: Length
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  // TODO: Length
  public readonly password: string;
}