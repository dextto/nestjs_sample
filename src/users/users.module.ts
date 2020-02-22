import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController as UsersController } from './users.controller';
import { UsersService as UsersService } from './users.service';
import { Sign } from 'src/signs/sign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Sign])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
