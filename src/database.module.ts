import { Module } from '@nestjs/common';
import { EnvModule } from './env.module';
import databaseConfig from './config/databaseConfig';
import { SequelizeModule } from '@nestjs/sequelize';

const config = databaseConfig();

@Module({
  imports: [
    EnvModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.dbName,
      autoLoadModels: true,
      synchronize: true, // TODO:
    }),
  ],
  providers: [],
  exports: []
})
export class DatabaseModule { }