import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sign } from './sign.entity';
import { SignsController } from './signs.controller';
import { SignsService } from './signs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sign])],
  controllers: [SignsController],
  providers: [SignsService]
})
export class SignsModule {}
