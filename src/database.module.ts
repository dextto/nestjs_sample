import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { EnvModule } from './env.module';
import databaseConfig from './config/databaseConfig';

const config = databaseConfig();

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.dbName,
      autoLoadEntities: true,
      bigNumberStrings: false,
      synchronize: config.database.synchronize,
      logging: false,
    }),
  ],
  providers: [],
  exports: []
})
export class DatabaseModule { }