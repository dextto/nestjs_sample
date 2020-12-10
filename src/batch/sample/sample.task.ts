import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class SampleTask {
  private readonly logger = new Logger(SampleTask.name);

  constructor(private scheduler: SchedulerRegistry) {
    this.addCronJob();
  }

  public addCronJob() {
    const name = 'cronSample';

    const job = new CronJob(`* * * * * *`, () => {
      this.logger.warn(`run! ${name}`);
    });

    this.scheduler.addCronJob(name, job);
    // job.start();

    this.logger.warn(`job ${name} added!`);
  }

  // @Cron('* * * * * *', { name: 'cronSample' })
  // handleCron() {
  //   this.logger.debug('Task Called');
  // }
}