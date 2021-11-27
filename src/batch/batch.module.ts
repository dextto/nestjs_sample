import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { BatchController } from './batch.controller';
import { TaskService } from './task.service';

// infrastructure

// interface
const controllers = [BatchController];

// application

// batch
const batches = [TaskService];

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers,
  providers: [...batches],
  exports: []
})
export class BatchModule { }
