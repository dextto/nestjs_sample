import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { BatchController } from './interface/batch.controller';
import { SampleTask } from './sample/sample.task';

// infrastructure

// interface
const controllers = [BatchController];

// application

// batch
const batches = [SampleTask];

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers,
  providers: [...batches],
  exports: []
})
export class BatchModule { }
