import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/databaseConfig';
import emailConfig from './config/emailConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, emailConfig],
      isGlobal: true,
      envFilePath: ['local.env', 'stage.env', 'production.env'],
    })],
  providers: [],
  exports: [EnvModule]
})
export class EnvModule { }