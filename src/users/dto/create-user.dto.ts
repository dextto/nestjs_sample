import { IsString, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;
}
