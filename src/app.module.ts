import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from 'typeorm';
import { SignsModule } from './signs/signs.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, SignsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
