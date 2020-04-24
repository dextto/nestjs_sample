import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from 'typeorm';
import { SignsModule } from './signs/signs.module';
import { TeamsModule } from './teams/teams.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { SandboxController } from './sandbox/sandbox.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, SignsModule, TeamsModule, TeamMembersModule],
  controllers: [AppController, SandboxController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
