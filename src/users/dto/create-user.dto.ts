import { IsString, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsString()
  role: UserRole;
}
