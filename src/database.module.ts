import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { EnvModule } from './env.module';
import * as connectionOptions from '@config/OrmConfig';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRoot(connectionOptions),
  ],
  providers: [],
  exports: []
})
export class DatabaseModule { }